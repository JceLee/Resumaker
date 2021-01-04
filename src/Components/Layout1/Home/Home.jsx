import React, { useState, useRef } from "react";
import { Icon, Menu, Segment } from "semantic-ui-react";

export default function Home() {
  const activeItem = useRef("home");
  const [open, setOpen] = useState(window.innerWidth >= 990);
  const desktopMode = useRef(false);
  const memory = useRef(true);
  const screenSize = useRef(window.innerWidth);

  const resizeScreen = () => {
    screenSize.current = window.innerWidth;
    if (screenSize.current > 990 && desktopMode.current === false) {
      memory.current = open;
      document.getElementById("menuItem").style.display = "row";
      setOpen(true);
    } else if (screenSize.current < 990 && desktopMode.current === true) {
      setOpen(memory.current);
    }
  };

  window.addEventListener("resize", resizeScreen);

  const handleItemClick = (name) => {
    activeItem.current = name.target.innerHTML;
    const skills = document.getElementById(activeItem.current);
    skills?.scrollIntoView({ behavior: "smooth" });
  };

  const navbarClick = () => {
    setOpen(!open);
  };

  return (
    <section className="navbar">
      <Segment inverted>
        <a className="bars" onClick={navbarClick}>
          <Icon name="bars" />
        </a>
        <div className="menuItem" id="menuItem">
          {open ? (
            <Menu inverted secondary>
              <Menu.Item
                name="HOME"
                active={activeItem.current === "HOME"}
                onClick={handleItemClick}
              />
              <Menu.Item
                name="PORTFOLIO"
                active={activeItem.current === "PORTFOLIO"}
                onClick={handleItemClick}
              />
              <Menu.Item
                name="RESUME"
                active={activeItem.current === "RESUME"}
                onClick={handleItemClick}
              />
              <Menu.Item
                name="ABOUT"
                active={activeItem.current === "ABOUT"}
                onClick={handleItemClick}
              />
              <Menu.Item
                name="SKILLS"
                active={activeItem.current === "SKILLS"}
                onClick={handleItemClick}
              />
              <Menu.Item
                name="CONTACT"
                active={activeItem.current === "CONTACT"}
                onClick={handleItemClick}
              />
            </Menu>
          ) : null}
        </div>
      </Segment>
    </section>
  );
}