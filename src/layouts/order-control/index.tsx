/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { IOrder, orderList } from "@/src/helpers/order-config";
import { useNews } from "@/src/hooks/use-news";
import { useNewsOrder } from "@/src/hooks/use-news-order";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./styles.module.css";

export const OrderControl = () => {
  const { news } = useNews();
  const [showOrderList, setShowOrderList] = React.useState(false);
  const [category, setCategory] = React.useState("Mais recentes");
  const { setOrder } = useNewsOrder();
  const pathname = usePathname();
  const orderControlRef = React.useRef<HTMLElement | null>(null);

  const handleClick = (order: IOrder) => {
    setCategory(order.title);
    setOrder(order.ref);
    setShowOrderList(false);
  };

  React.useEffect(() => {
    setOrder("recent");
    setCategory("Mais recentes");
  }, [pathname, setOrder]);

  React.useEffect(() => {
    if (!showOrderList) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        orderControlRef.current &&
        !orderControlRef.current.contains(e.target as Node)
      ) {
        setShowOrderList(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showOrderList]);

  return (
    <section
      className={`${styles.orderControl} ${news && news.length < 2 ? undefined : styles.active}`}
      ref={orderControlRef}
    >
      <React.Fragment>
        <div>
          Ordenar notícias por:{" "}
          <span onClick={() => setShowOrderList((show) => !show)}>
            {category}{" "}
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`${styles.chevron} ${
                showOrderList ? styles.chevronOpen : ""
              }`}
            />
          </span>
        </div>

        <nav className={showOrderList ? styles.active : ""}>
          <ul>
            {orderList.map((el) => (
              <li
                onClick={() => handleClick(el)}
                key={el.ref}
                className={category === el.title ? styles.active : ""}
              >
                {el.title}
              </li>
            ))}
          </ul>
        </nav>
      </React.Fragment>
    </section>
  );
};
