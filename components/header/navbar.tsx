"use client";
import { useAppSelector } from "@/hooks/redux-hooks";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../button/customButton";

interface NavigationButtonProps {
  href: string;
  label: string;
}

const NavigationButton = ({ href, label }: NavigationButtonProps) => {
  const pathName = usePathname();
  const activeColor = "text-white opacity-100";
  const inActiveColor = "text-white opacity-50";
  let textColor = inActiveColor;
  if (href === "/") {
    if (pathName === href) {
      textColor = activeColor;
    }
  } else {
    if (pathName.includes(href)) {
      textColor = activeColor;
    } else {
      textColor = inActiveColor;
    }
  }
  return (
    <Link href={href} className={`${textColor}`}>
      {label}
    </Link>
  );
};

const navLinks: NavigationButtonProps[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/shop",
    label: "Shop",
  },
  {
    href: "/manage/products",
    label: "Manage Products",
  },
];
const Navbar = () => {
  const { products } = useAppSelector((state) => state.cart);
  const [isCartFilled, setIsCartFilled] = useState<boolean>(false);
  const [totalInCart, setTotalInCart] = useState<number>(0);
  useEffect(() => {
    if (Object.keys(products).length > 0) {
      let total = 0;
      for (let item in products) {
        total += products[item].total;
      }
      setIsCartFilled(true);
      setTotalInCart(total);
    } else {
      setIsCartFilled(false);
      setTotalInCart(0);
    }
  }, [products]);
  const router = useRouter();
  return (
    <nav className="w-full h-8 fixed top-0 left-0 z-[100] mt-4">
      <div className="max-w-[1220px] mx-auto w-full py-4 bg-white bg-opacity-10 backdrop-blur-3xl rounded-md px-8">
        <div className="grid grid-cols-3 place-content-between items-center">
          <div className="text-lg font-bold">CRYPTO SHOP</div>
          <div className="w-full flex flex-row justify-center space-x-4">
            {navLinks.map((navLink: NavigationButtonProps, idx) => (
              <NavigationButton {...navLink} key={idx} />
            ))}
          </div>
          <Badge count={totalInCart} className="place-self-end">
            <Button
              onClick={() => {
                router.push("/shop/cart");
              }}
              variant={"outline"}
              intent={"circle"}
              className="flex flex-row items-center space-x-2
              text-xl"
            >
              <ShoppingCartOutlined />
            </Button>
          </Badge>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
