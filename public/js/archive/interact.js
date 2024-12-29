interact(".piece").draggable({
    listeners: {
        start(event) {
            console.log(event.target);
        },
        move(event) {
            const target = event.target;
            const dataX = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
            const dataY = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

            target.style.transform = `translate(${dataX}px, ${dataY}px)`;
            target.setAttribute("data-x", dataX);
            target.setAttribute("data-y", dataY);
        }
    }
});
