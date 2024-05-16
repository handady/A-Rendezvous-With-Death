import interact from "interactjs";

export default {
  mounted(el) {
    interact(el)
      .draggable({
        onmove: (event) => {
          const target = event.target;
          const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);
        },
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
      })
      .on("resizemove", (event) => {
        const target = event.target;
        const x =
          (parseFloat(target.getAttribute("data-x")) || 0) +
          event.deltaRect.left;
        const y =
          (parseFloat(target.getAttribute("data-y")) || 0) +
          event.deltaRect.top;

        target.style.width = `${event.rect.width}px`;
        target.style.height = `${event.rect.height}px`;
        target.style.transform = `translate(${x}px, ${y}px)`;

        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
      });
  },
};
