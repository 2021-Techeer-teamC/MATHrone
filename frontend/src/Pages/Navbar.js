
import ElementPopper from "react-element-popper";
import "react-element-popper/build/element_popper.css";
import "./navbar.css";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

import React, { useEffect, useRef, useState } from "react";

export default function NavBarTest() {
    const [navItem, setNavItem] = useState("")
    const navBarRef = useRef()

    useEffect(() => {
        function handleClickOutSide(e) {
            if (
                (
                    navBarRef.current &&
                    !navBarRef.current.contains(e.target) &&
                    !e.target.classList.contains("navbar-item")
                ) ||
                e.target.classList.contains("navbar")
            ) {
                setNavItem("")
            }
        }

        document.addEventListener("click", handleClickOutSide)

        return () => document.removeEventListener("click", handleClickOutSide)
    }, [])

    const bookContent = [
            {
                name: "전체",
            },
            {
                name: "EBS",
                childs: [
                    { name: "수능완성" },
                    { name: "수능특강" },
                ]
            },
            {
                name: "교육청",
                childs: [
                    { name: "3월 모의고사" },
                    { name: "4월 모의고사" },
                    { name: "5월 모의고사" },
                    { name: "7월 모의고사" },
                    { name: "8월 모의고사" },
                    { name: "10월 모의고사" },
                ]
            },
    ]

    //const itemNames = Object.keys(items);

    return (
        <div className="item" style={{textAlign:'left'}}>
                    <ElementPopper
                        //element={<NavItem name={name} />}
                        popper={<List items={bookContent} />}
                        containerStyle={{ margin: "auto 0" }}
                        offsetY={12}
                        //position={index === 0 ? "bottom-left" : index === (itemNames.length - 1) ? "bottom-right" : "bottom-center"}
                        fixMainPosition
                    />
        </div>
    )

    // function NavItem({ name }) {
    //     return (
    //         <div
    //             className="navbar-item"
    //             onClick={toggleVisible}
    //         >
    //             {name}
    //         </div>
    //     )

    //     function toggleVisible() {
    //         setNavItem(navItem === name ? "" : name)
    //     }
    // }

    function List({ items }) {
        const [subMenu, setSubMenu] = useState("")

        return (
            <div className="items">
                {items.map((item, i) => {
                    return (item.childs ?
                        <ElementPopper
                            key={i}
                            element={<Item item={item} />}
                            popper={subMenu === item.name && <List items={item.childs} />}
                            containerStyle={{ width: "100%" }}
                            position="right-top"
                        /> :
                        <Item key={i} item={item} />
                    )
                })}
            </div>
        )

        function Item({ item }) {
            return (
                <div
                    className="item"
                    onMouseOver={() => openSubMenu(item.name)}
                >
                    {item.name}
                    {item.childs && <span>{">"}</span>}
                </div>
            )
        }

        function openSubMenu(name) {
            setSubMenu(name)
        }
    }
}