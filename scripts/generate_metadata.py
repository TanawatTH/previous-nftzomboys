import json
import random

def generate_metadata():
    traits = {
        "background": ["Graveyard", "City Ruins", "Forest"],
        "skin": ["Pale", "Decayed", "Rotten"],
        "eyes": ["Glowing Red", "Empty Sockets", "Zombie Blue"],
        "accessory": ["Chains", "Top Hat", "Bandages"]
    }

    metadata = []
    for i in range(1, 101):  # Generate for first 100 for testing
        attributes = []
        for trait, options in traits.items():
            value = random.choice(options)
            attributes.append({"trait_type": trait.capitalize(), "value": value})

        token_metadata = {
            "name": f"Zomboys #{i}",
            "description": "A unique zombie character from the Zomboys collection.",
            "image": f"ipfs://your_ipfs_hash/{i}.png",  # Placeholder
            "attributes": attributes
        }
        metadata.append(token_metadata)

    with open("metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)

if __name__ == "__main__":
    generate_metadata()