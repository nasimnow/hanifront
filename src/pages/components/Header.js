import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import styles from "./header.module.scss";
import CoinIcon from "../../assets/coinicon.png";

const Header = () => {
  const menuItems = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Add", link: "/add" },
  ];
  const history = useHistory();
  const location = useLocation();

  const currentPath =
    location.pathname.slice(1, 2).toUpperCase() + location.pathname.slice(2);
  const [selected, setSelected] = useState(currentPath ? currentPath : "Home");

  const handleMenuClick = (menuItem) => {
    setSelected(menuItem.name);
    history.push(menuItem.link);
  };
  return (
    <div className={styles.header}>
      <div className={styles.header_logo}>
        <img src={CoinIcon} />
      </div>
      <div className={styles.menu_container}>
        {menuItems.map((menuItem) => (
          <div
            className={
              selected === menuItem.name
                ? styles.menu_item_selected
                : styles.menu_item
            }
            onClick={() => handleMenuClick(menuItem)}
          >
            {menuItem.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
