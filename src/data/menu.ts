export interface MenuItem {
  title: string;
  description: string;
  /** Harga dalam ribuan rupiah */
  price: number;
  image: string;
}

export const BURGER_DESC = "Spicy Burger With Onion Ring And Blaster Beff";
export const DRINK_DESC = "Drink Blend of Heaven and Earth";

export const MENU_ITEMS: MenuItem[] = [
  {
    title: "Melted LOL Burger",
    description: BURGER_DESC,
    price: 40,
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Barbarian Burger",
    description: BURGER_DESC,
    price: 60,
    image:
      "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YnVyZ2VyfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Melted Burger",
    description: BURGER_DESC,
    price: 40,
    image:
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJ1cmdlcnxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Chibi Burger",
    description: BURGER_DESC,
    price: 25,
    image:
      "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVyZ2VyfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Mint Lemonde",
    description: DRINK_DESC,
    price: 20,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZHJpbmt8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Mango Lemonde",
    description: DRINK_DESC,
    price: 20,
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGRyaW5rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Oreo MilkShake",
    description: DRINK_DESC,
    price: 25,
    image:
      "https://images.unsplash.com/photo-1619158401201-8fa932695178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    title: "Tropical sunset Mint lemonade",
    description: DRINK_DESC,
    price: 30,
    image:
      "https://images.unsplash.com/photo-1587888637140-849b25d80ef9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGRyaW5rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];

/** Galeri foto di halaman Home & About (kartu tanpa teks). */
export const GALLERY_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8amFwYW58ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1542931287-023b922fa89b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8amFwYW58ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8amFwYW58ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1490761668535-35497054764d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGphcGFufGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60",
];

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/FatlemYoY", icon: "https://cdn-icons-png.flaticon.com/512/2504/2504903.png" },
  { label: "Twitter", href: "https://twitter.com/fatlemm?s=11&t=CqD58FIqzBZ8H1cBNvFb0Q", icon: "https://cdn-icons-png.flaticon.com/512/2504/2504947.png" },
  { label: "Instagram", href: "https://www.instagram.com/fat_lem_/?igshid=YmMyMTA2M2Y%3D", icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCA_Jb3v1VukaWwaWbzadDeA", icon: "https://cdn-icons-png.flaticon.com/512/3938/3938026.png" },
  { label: "GitHub", href: "https://github.com/FaathirElTasleem", icon: "https://cdn-icons-png.flaticon.com/512/733/733553.png" },
];
