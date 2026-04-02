"""
update_nav.py
─────────────────────────────────────────────────────────────────────
Scans the repository structure and keeps nav.json up to date.

Rules:
  - New folders with a README.md are appended to the correct section.
  - Existing entries are never modified (custom labels are preserved).
  - Folders without a README.md are ignored.
  - Instructions.md presence is detected automatically.

Usage:
  python scripts/update_nav.py
  python scripts/update_nav.py --dry-run   # print diff only, no write

Sections scanned:
  Labs/<Category>/<lab>/
  Projects/<project>/
  Certs-Badges/Simu-Learn/<cert>/
"""

import json
import os
import sys
import argparse

# ── Config ────────────────────────────────────────────────────────
REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NAV_FILE  = os.path.join(REPO_ROOT, "nav.json")

# Top-level sections and how to scan them
SCAN_CONFIG = {
    "Labs": {
        # Labs has sub-categories (Compute, Linux, etc.) each with lab folders
        "mode": "categorised",
        "root": "Labs",
        # Map folder name → section id and icon (add new categories here as needed)
        "category_meta": {
            "Compute":    {"id": "sec-compute",    "icon": "🖥️"},
            "Databases":  {"id": "sec-databases",  "icon": "📊"},
            "Linux":      {"id": "sec-linux",      "icon": "👾"},
            "Networking": {"id": "sec-networking", "icon": "🌐"},
            "Security":   {"id": "sec-security",   "icon": "🔒"},
            "Storage":    {"id": "sec-storage",    "icon": "💾"},
        },
    },
    "Projects": {
        "mode": "flat",
        "root": "Projects",
    },
    "Certs-Badges": {
        # Certs has one known sub-group: Simu-Learn
        "mode": "categorised",
        "root": "Certs-Badges",
        "category_meta": {
            "Simu-Learn": {"id": "sec-simulearn", "icon": "🏅"},
        },
    },
}


# ── Helpers ───────────────────────────────────────────────────────

def folder_label(name: str) -> str:
    """Convert a snake_case or kebab-case folder name to a Title Case label."""
    return name.replace("_", " ").replace("-", " ").title()


def has_readme(abs_path: str) -> bool:
    return os.path.isfile(os.path.join(abs_path, "README.md"))


def has_instructions(abs_path: str) -> bool:
    return os.path.isfile(os.path.join(abs_path, "Instructions.md"))


def existing_paths(entries: list) -> set:
    """Return the set of 'path' values already present in an entries list."""
    return {e["path"] for e in entries}


def make_entry(rel_path: str) -> dict:
    """Build a new nav entry from a relative path."""
    name = rel_path.rstrip("/").split("/")[-1]
    abs_path = os.path.join(REPO_ROOT, rel_path)
    return {
        "label": folder_label(name),
        "path":  rel_path,
        "instructions": has_instructions(abs_path),
    }


# ── Scanner ───────────────────────────────────────────────────────

def scan_flat(section_config: dict, existing_entries: list) -> tuple[list, list]:
    """
    Scan a flat section (e.g. Projects/) for direct child folders.
    Returns (updated_entries, new_labels) where new_labels lists what was added.
    """
    root_abs  = os.path.join(REPO_ROOT, section_config["root"])
    known     = existing_paths(existing_entries)
    entries   = list(existing_entries)  # copy — preserves order and custom labels
    new_items = []

    if not os.path.isdir(root_abs):
        return entries, new_items

    for name in sorted(os.listdir(root_abs)):
        abs_path = os.path.join(root_abs, name)
        if not os.path.isdir(abs_path) or not has_readme(abs_path):
            continue
        rel_path = f"{section_config['root']}/{name}"
        if rel_path not in known:
            entry = make_entry(rel_path)
            entries.append(entry)
            new_items.append(rel_path)

    return entries, new_items


def scan_categorised(section_config: dict, existing_children: list) -> tuple[list, list]:
    """
    Scan a categorised section (e.g. Labs/ → Compute/ → ec2_setup/).
    existing_children is the 'children' list from nav.json for this section.
    Returns (updated_children, new_labels).
    """
    root     = section_config["root"]
    root_abs = os.path.join(REPO_ROOT, root)
    cat_meta = section_config.get("category_meta", {})
    new_items = []

    # Build a lookup of existing children by id
    children_by_id = {c["id"]: c for c in existing_children}

    # Walk each category directory
    for cat_name in sorted(os.listdir(root_abs)):
        cat_abs = os.path.join(root_abs, cat_name)
        if not os.path.isdir(cat_abs):
            continue

        meta = cat_meta.get(cat_name)
        if meta is None:
            # Unknown category — create a new child section
            meta = {
                "id":   f"sec-{cat_name.lower()}",
                "icon": "📁",
            }

        sec_id = meta["id"]

        if sec_id not in children_by_id:
            # Brand new category section
            children_by_id[sec_id] = {
                "id":       sec_id,
                "label":    cat_name,
                "icon":     meta["icon"],
                "overview": f"{root}/{cat_name}/README.md",
                "entries":  [],
            }

        child   = children_by_id[sec_id]
        known   = existing_paths(child.get("entries", []))
        entries = list(child.get("entries", []))

        for entry_name in sorted(os.listdir(cat_abs)):
            entry_abs = os.path.join(cat_abs, entry_name)
            if not os.path.isdir(entry_abs) or not has_readme(entry_abs):
                continue
            rel_path = f"{root}/{cat_name}/{entry_name}"
            if rel_path not in known:
                entry = make_entry(rel_path)
                entries.append(entry)
                new_items.append(rel_path)

        child["entries"] = entries

    # Rebuild children list in original order, appending any newly discovered categories
    original_ids = [c["id"] for c in existing_children]
    result = [children_by_id[i] for i in original_ids if i in children_by_id]
    for sec_id, child in children_by_id.items():
        if sec_id not in original_ids:
            result.append(child)

    return result, new_items


# ── Main ──────────────────────────────────────────────────────────

def update_nav(dry_run: bool = False) -> bool:
    """
    Load nav.json, scan the repo, write back any changes.
    Returns True if changes were made.
    """
    with open(NAV_FILE, "r") as f:
        nav = json.load(f)

    all_new = []

    for section in nav["sections"]:
        sec_label = section["label"]
        config    = SCAN_CONFIG.get(sec_label)
        if config is None:
            continue

        if config["mode"] == "flat":
            updated, new = scan_flat(config, section.get("entries", []))
            section["entries"] = updated
            all_new.extend(new)

        elif config["mode"] == "categorised":
            updated, new = scan_categorised(config, section.get("children", []))
            section["children"] = updated
            all_new.extend(new)

    if not all_new:
        print("✅ nav.json is up to date — no changes needed.")
        return False

    print(f"🆕 {len(all_new)} new entries detected:")
    for p in all_new:
        print(f"   + {p}")

    if dry_run:
        print("\n⚠️  Dry run — nav.json not written.")
        print("\nProposed nav.json:")
        print(json.dumps(nav, indent=2))
        return True

    with open(NAV_FILE, "w") as f:
        json.dump(nav, f, indent=2)
        f.write("\n")

    print(f"\n✅ nav.json updated.")
    return True


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sync nav.json with repo structure.")
    parser.add_argument("--dry-run", action="store_true", help="Print changes without writing.")
    args = parser.parse_args()

    changed = update_nav(dry_run=args.dry_run)
    sys.exit(0)
