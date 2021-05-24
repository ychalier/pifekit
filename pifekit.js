var orderingDrag = {
    items: [],
    dragged: null,
}

function getParentInArray(item, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].contains(item)) {
            return array[i];
        }
    }
    return null;
}

function bindDraggableOrdering(container, itemSelector, dropCallback) {
    container.querySelectorAll(itemSelector).forEach((item, i) => {
        orderingDrag.items.push(item);
        item.setAttribute("draggable", "true");
        item.addEventListener("dragstart", (event) => {
            event.dataTransfer.dropEffect = "move";
            orderingDrag.dragged = item;
        });
    });
    container.addEventListener("dragover", (event) => {
        event.preventDefault();
    });
    container.addEventListener("drop", (event) => {
        event.preventDefault();
        let parent = getParentInArray(event.target, orderingDrag.items);
        if (parent) {
            let sourceIndex = Array.from(container.children).indexOf(orderingDrag.dragged);
            let targetIndex = Array.from(container.children).indexOf(parent);
            let somethingWasMoved = false;
            if (sourceIndex > targetIndex) { // Element moved up
                container.insertBefore(orderingDrag.dragged, parent);
                somethingWasMoved = true;
            } else if (sourceIndex < targetIndex) { // Element moved down
                container.insertBefore(orderingDrag.dragged, parent.nextSibling);
                somethingWasMoved = true;
            }
            if (somethingWasMoved && dropCallback) {
                dropCallback({
                    "sourceIndex": sourceIndex,
                    "targetIndex": targetIndex
                });
            }
            orderingDrag.dragged = null;
        }
    });
}

function showModal(modalId) {
    document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
}

function startAutoCarousels() {
    document.querySelectorAll(".carousel.carousel-auto").forEach((item) => {
        setInterval(() => {
            let nextLocator = item.querySelector(".carousel-locator:checked ~ .carousel-locator");
            if (!nextLocator) {
                nextLocator = item.querySelector(".carousel-locator:first-of-type")
            }
            nextLocator.checked = true;
        }, 5000);
    });
}

function setScrolls() {
    document.querySelectorAll(".scroll-to").forEach((item) => {
        item.scroll(
            parseInt(item.getAttribute("scroll-x")),
            parseInt(item.getAttribute("scroll-y"))
        );
    });
}

function bindTabs() {
    document.querySelectorAll(".tab-container").forEach((tabContainer) => {
        let first = true;
        tabContainer.querySelectorAll("li.tab-item > a").forEach((tabItem) => {
            let tabContent = tabContainer.querySelector("#" + tabItem.getAttribute("for"));
            if (first) {
                first = false;
                tabItem.classList.add("active");
            } else {
                tabContent.style.height = "0";
            }
            tabItem.addEventListener("click", (event) => {
                tabContainer.querySelectorAll("li.tab-item > a").forEach((tabItemAux) => {
                    tabItemAux.classList.remove("active");
                    tabContainer.querySelector("#" + tabItemAux.getAttribute("for")).style.height = "0";
                });
                tabItem.classList.add("active");
                tabContent.style.height = "auto";
            });
        });
    });
}

function bindToastClearButtons() {
    document.querySelectorAll(".toast .btn.btn-clear").forEach((item) => {
        item.addEventListener("click", (event) => {
            item.parentNode.style.display = "none";
        });
    });
}

function bindCensorButtons() {
    document.querySelectorAll(".censor-container").forEach((container) => {
        let button = container.querySelector(".censor-button");
        let input = container.querySelector(".censor-input");
        button.addEventListener("click", (event) => {
            if (input.getAttribute("type") == "text") {
                input.setAttribute("type", "password");
            } else {
                input.setAttribute("type", "text");
            }
        });
    });
}

window.addEventListener("load", () => {
    startAutoCarousels();
    setScrolls();
    bindTabs();
    bindToastClearButtons();
    bindCensorButtons();
});