document.addEventListener("DOMContentLoaded", () => {
    const nodeTypeSelect = document.getElementById("nodeType");
    const nodeValueInput = document.getElementById("nodeValue");
    const createNodeButton = document.getElementById("createNode");
    const treeContainer = document.getElementById("tree");
    let nodeIdCounter = 1;

    let firstNodeCreated = false; // To track if the first node is created

    createNodeButton.addEventListener("click", () => {
        const nodeType = nodeTypeSelect.value;
        const nodeValue = nodeValueInput.value.trim();

        if (nodeValue === "") {
            alert("Please enter a node value.");
            return;
        }

        if (nodeType === "single") {
            createSingleNode(nodeValue);
        } else if (nodeType === "parent") {
            createParentNode(nodeValue);
        } else if (nodeType === "child") {
            createChildNode(nodeValue);
        }

        nodeValueInput.value = "";
    });

    function createSingleNode(value) {
        const newNodeBox = createNodeBox();
        const newNode = createNodeElement(value);
        newNodeBox.appendChild(newNode);
        treeContainer.insertBefore(newNodeBox, treeContainer.firstChild);

        if (!firstNodeCreated) {
            firstNodeCreated = true;
            newNode.addEventListener("click", () => {
                if (confirm("Do you want to delete this node?")) {
                    newNodeBox.remove();
                }
            });
        }
    }

    function createParentNode(value) {
        const newNodeBox = createNodeBox("parent-box");
        const parent = createNodeElement(value, "parent");
        newNodeBox.appendChild(parent);

        if (!firstNodeCreated) {
            firstNodeCreated = true;
            parent.addEventListener("click", () => {
                if (confirm("Do you want to delete this node and its children?")) {
                    newNodeBox.remove();
                }
            });
        }

        parent.addEventListener("click", () => {
            if (confirm("Do you want to delete this node and its children?")) {
                newNodeBox.remove();
            }
        });

        treeContainer.appendChild(newNodeBox);
    }

    function createChildNode(value) {
        const parentBoxes = document.querySelectorAll(".parent-box");
        if (parentBoxes.length === 0) {
            alert("There are no parent nodes to attach to.");
            return;
        }

        const parentBox = parentBoxes[parentBoxes.length - 1];
        const child = createNodeElement(value, "child");
        parentBox.appendChild(child);

        child.addEventListener("click", () => {
            if (confirm("Do you want to delete this child node?")) {
                child.remove();
            }
        });
    }

    function createNodeBox(type = "") {
        const newNodeBox = document.createElement("div");
        newNodeBox.className = `node-box ${type}`;
        return newNodeBox;
    }

    function createNodeElement(value, type = "") {
        const newNode = document.createElement("div");
        newNode.className = `node ${type}`;
        newNode.innerText = value;
        newNode.dataset.nodeId = nodeIdCounter++;
        return newNode;
    }
});
