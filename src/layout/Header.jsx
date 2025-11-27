import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { BlackLogo, WhiteLogo } from "../assets/images";
import { Icon } from "../components";
import MegaMenu from "../components/MegaMenu";
import { fetchCategories } from "../store/slices/CategoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const user = useSelector((state) => state.userAuth);
  const categories = useSelector((state) => state.categories.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const stickyHeaderFunc = () => {
    // kept for backward compatibility; logic moved to handleScroll used in effect
  };

  const handleScroll = () => {
    if (!headerRef.current || !logoRef.current) return;
    if (
      document.body.scrollTop > 30 ||
      document.documentElement.scrollTop > 30
    ) {
      headerRef.current.classList.remove("home-nav");
      headerRef.current.classList.add("sticky__header");
      logoRef.current.src = BlackLogo;
    } else {
      if (pathname === "/") {
        headerRef.current.classList.add("home-nav");
        logoRef.current.src = WhiteLogo;
      } else {
        headerRef.current.classList.remove("home-nav");
        logoRef.current.src = BlackLogo;
      }
      headerRef.current.classList.remove("sticky__header");
    }
  };

  const handleNavButtonClick = () => {
    setMenuOpen(!menuOpen);

    if (!menuOpen) {
      if (mobileMenuRef.current)
        mobileMenuRef.current.classList.add("mobile-menu--active");
      document.body.style.overflow = "hidden";
      if (headerRef.current) {
        headerRef.current.classList.add("bg-white");
        headerRef.current.classList.remove("home-nav");
      }
      if (logoRef.current) logoRef.current.src = BlackLogo;
    } else {
      if (pathname === "/") {
        if (headerRef.current) {
          headerRef.current.classList.remove("bg-white");
          headerRef.current.classList.add("home-nav");
        }
        if (logoRef.current) logoRef.current.src = WhiteLogo;
      } else {
        if (headerRef.current) headerRef.current.classList.remove("home-nav");
        if (logoRef.current) logoRef.current.src = BlackLogo;
      }
      if (mobileMenuRef.current)
        mobileMenuRef.current.classList.remove("mobile-menu--active");
      document.body.style.overflow = "auto";
    }
  };

  // const closeMenu = () => {
  //   if (pathname === "/") {
  //     headerRef.current.classList.remove("bg-white");
  //     headerRef.current.classList.add("home-nav");
  //     logoRef.current.src = WhiteLogo;
  //   }
  //   mobileMenuRef.current.classList.remove("mobile-menu--active");
  //   document.body.style.overflow = "auto";
  //   setMenuOpen(false);
  // };

  useEffect(() => {
    if (pathname === "/") {
      if (headerRef.current) {
        headerRef.current.classList.remove("bg-white");
        headerRef.current.classList.add("home-nav");
      }
      if (logoRef.current) logoRef.current.src = WhiteLogo;
    }
    if (mobileMenuRef.current)
      mobileMenuRef.current.classList.remove("mobile-menu--active");
    document.body.style.overflow = "auto";
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // run once and attach scroll listener; cleanup on unmount
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const logout = () => {
    signOut(auth).then(() => navigate("/login"));
  };

  return (
    <header
      className={`pt-3 border-bottom ${
        pathname === "/" ? "home-nav fixed-top border-bottom-0" : ""
      }`}
      ref={headerRef}
      style={{ height: "6rem" }}
    >
      <div className="h-100 position-relative">
        <nav className="menu">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-3 text-start menu__logo">
                <Link
                  to="/"
                  //  onClick={closeMenu}
                >
                  <img
                    src={pathname === "/" ? WhiteLogo : BlackLogo}
                    alt=""
                    id="logo"
                    ref={logoRef}
                  />
                  <span>One</span>Stop
                </Link>
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center gap-4">
                <NavLink
                  to="/products"
                  className="products-link"
                  style={({ isActive }) =>
                    isActive ? { color: "#fbb03b" } : null
                  }
                >
                  المنتجات
                </NavLink>
                <MegaMenu categories={categories} />
              </div>
              <div className="col-6 col-lg-3 d-flex justify-content-end">
                <Icon
                  icon="search"
                  size={"3rem"}
                  className={"mx-3 mx-lg-4 menu__icon"}
                  disableFill
                  // onClick={closeMenu}
                />
                <Link
                  to="/cart"
                  className=" position-relative"
                  // onClick={closeMenu}
                >
                  <Icon
                    icon="cart"
                    size={"3rem"}
                    className={"mx-3 mx-lg-4 menu__icon"}
                    disableFill
                  />
                  <span className="menu__badge">{totalQuantity}</span>
                </Link>
                <div className="dropdown-center">
                  <div data-bs-toggle="dropdown" aria-expanded="false">
                    {user.isAuth && user.photoURL !== null ? (
                      <div
                        className="text-center mx-3 mx-lg-4 menu__icon--avatar--mobile"
                        style={{ width: "3rem" }}
                      >
                        <img
                          src={user.photoURL}
                          alt="user"
                          className={`rounded-circle  ${
                            user.isAuth ? "menu__icon--avatar" : null
                          }`}
                          role="button"
                          style={{ width: "100%" }}
                        />
                      </div>
                    ) : (
                      <Icon
                        icon="avatar"
                        size={"3rem"}
                        className={`mx-3 mx-lg-4 menu__icon menu__icon--avatar--mobile ${
                          user.isAuth ? "menu__icon--avatar" : null
                        }`}
                        disableFill
                      />
                    )}
                  </div>
                  <ul className="dropdown-menu text-center pt-3">
                    {user.isAuth ? (
                      <>
                        <li>
                          <Link className="dropdown-item text-success h4">
                            {user.displayName
                              ? user.displayName
                              : user.email.slice(0, 7) + "..."}
                          </Link>
                        </li>
                        <li onClick={logout}>
                          <Link className="dropdown-item text-black-50 h5">
                            Logout
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            className="dropdown-item text-black h4"
                            to={"/register"}
                          >
                            Register
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item text-black h4"
                            to={"/login"}
                          >
                            Login
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <Icon
                  icon={menuOpen ? "close" : "menu"}
                  size={"3rem"}
                  className={"mx-3 mx-lg-4 menu__icon menu__icon--bars"}
                  disableFill
                  onClick={handleNavButtonClick}
                />
              </div>
            </div>
          </div>
        </nav>

        <div className="mobile-menu main-scroll" ref={mobileMenuRef}>
          <ul className="w-100 h-100">
            {categories && categories.length > 0 ? (
              <>
                <li className="my-3">
                  <div className="h4 text-warning px-3">الأقسام</div>
                </li>
                {categories.map((category) => (
                  <li key={category.id} className="my-3">
                    <NavLink
                      to={`/category/${category.id}`}
                      className="h5 menu__link px-3"
                      style={({ isActive }) =>
                        isActive ? { color: "#fbb03b" } : null
                      }
                    >
                      {category.name}
                    </NavLink>
                  </li>
                ))}
              </>
            ) : (
              <li className="my-5 text-center text-muted">
                جاري تحميل الأقسام...
              </li>
            )}
            <li>
              <div
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="true"
                aria-controls="collapseExample"
              >
                {user.isAuth && user.photoURL !== null ? (
                  <div className="text-center" style={{ width: "3rem" }}>
                    <img
                      src={user.photoURL}
                      alt="user"
                      className={`rounded-circle mx-3 mx-lg-4 ${
                        user.isAuth ? "menu__icon--avatar" : null
                      }`}
                      role="button"
                      style={{ width: "100%" }}
                    />
                  </div>
                ) : (
                  <Icon
                    icon="avatar"
                    size={"3rem"}
                    className={`mx-3 mx-lg-4 menu__icon ${
                      user.isAuth ? "menu__icon--avatar" : null
                    }`}
                    disableFill
                  />
                )}
              </div>
              <ul className="collapse show mt-4" id="collapseExample">
                {user.isAuth ? (
                  <>
                    <li>
                      <Link className="text-success h4">
                        {user.displayName
                          ? user.displayName
                          : user.email.slice(0, 7) + "..."}
                      </Link>
                    </li>
                    <li>
                      <Link className="text-black-50 h5" onClick={logout}>
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="text-black h4" to={"/register"}>
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link className="text-black h4" to={"/login"}>
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              {/* {user.isAuth ? (
                <div className="d-flex align-items-center">
                  <span>{user.email}</span>
                  <Link to={"/login"} className="ms-auto pe-5">
                    <span>Logout</span>
                  </Link>
                </div>
              ) : (
                <Link to={"/login"} onClick={closeMenu}>
                  <Icon
                    icon="avatar"
                    size={"3rem"}
                    className={"mx-3 mx-lg-4 menu__icon "}
                    disableFill
                  />
                </Link>
              )} */}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
