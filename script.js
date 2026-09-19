const itemsDiv = document.getElementById("items");

async function loadItems() {
    itemsDiv.innerHTML = "";

    const snapshot = await db.collection("posts").orderBy("created", "desc").get();
    snapshot.forEach(doc => {
        const data = doc.data();

        const div = document.createElement("div");
        div.className = "item";

        if (data.image) {
            const img = document.createElement("img");
            img.src = data.image;
            div.appendChild(img);
        }

        if (data.text) {
            const p = document.createElement("p");
            p.textContent = data.text;
            div.appendChild(p);
        }

        itemsDiv.appendChild(div);
    });
}

window.addItem = async function () {
    const file = document.getElementById("photoInput").files[0];
    const text = document.getElementById("textInput").value;

    if (!file && !text) {
        alert("Dodaj zdjęcie lub tekst!");
        return;
    }

    let imageURL = null;

    if (file) {
        const reader = new FileReader();
        reader.onload = async function (e) {
            const base64 = e.target.result;

            const fileName = "photo_" + Date.now() + ".jpg";
            const storageRef = storage.ref("photos/" + fileName);

            await storageRef.putString(base64, "data_url");
            imageURL = await storageRef.getDownloadURL();

            await savePost(imageURL, text);
        };
        reader.readAsDataURL(file);
    } else {
        await savePost(null, text);
    }
};

async function savePost(image, text) {
    await db.collection("posts").add({
        image: image,
        text: text,
        created: Date.now()
    });

    loadItems();
}

loadItems();
