import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/MegaMenu.scss";

const MegaMenu = ({ categories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="mega-menu-wrapper" ref={menuRef}>
            <button
                className="mega-menu-trigger"
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
            >
                جميع الأقسام
                <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
            </button>

            {isOpen && (
                <div
                    className="mega-menu-dropdown"
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <div className="mega-menu-container">
                        <div className="mega-menu-grid">
                            {categories && categories.length > 0 ? (
                                categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        to={`/category/${category.id}`}
                                        className="mega-menu-item"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="mega-menu-item-icon">
                                            📦
                                        </div>
                                        <div className="mega-menu-item-content">
                                            <h4>{category.name}</h4>
                                            {category.count > 0 && (
                                                <span className="item-count">{category.count} منتج</span>
                                            )}
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="mega-menu-empty">لا توجد أقسام متاحة</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MegaMenu;
