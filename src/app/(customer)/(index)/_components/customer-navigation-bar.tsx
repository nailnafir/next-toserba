import { getUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export default async function CustomerNavigationBar() {
  const { session, user } = await getUser();

  const listMenuPath = [
    {
      pathName: "/catalogs",
      menuName: "Toko",
    },
    {
      pathName: "/categories",
      menuName: "Kategori",
    },
    {
      pathName: "/reviews",
      menuName: "Ulasan",
    },
    {
      pathName: "/rewards",
      menuName: "Hadiah",
    },
  ];

  return (
    <nav className="container sticky top-0 z-50 max-w-[1130px] mx-auto flex items-center justify-between bg-[#0D5CD7] p-5 rounded-3xl">
      <div className="flex shrink-0">
        <Image
          src="/assets/logos/logo.svg"
          width={157}
          height={42}
          alt="icon"
        />
      </div>
      <ul className="flex items-center gap-[30px]">
        {listMenuPath.map((menuPath, index) => (
          <li
            key={index}
            className={`hover:font-bold hover:text-[#FFC736] transition-all duration-300 font-bold text-white`}
          >
            <Link href={menuPath.pathName}>{menuPath.menuName}</Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3">
        <Link href="/carts">
          <div className="w-12 h-12 flex shrink-0">
            <Image
              src="/assets/icons/cart.svg"
              width={48}
              height={48}
              alt="icon"
            />
          </div>
        </Link>
        {session && user?.role === "customer" ? (
          <>
            <p className="text-white">Hai, {user.name}</p>
            <div className="w-[48px] h-[48px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden">
              <Image
                src="/assets/photos/p2.png"
                width={48}
                height={48}
                className="w-full h-full object-cover rounded-full"
                alt="photo"
              />
            </div>
          </>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="p-[12px_20px] bg-white rounded-full font-semibold"
            >
              Masuk
            </Link>
            <Link
              href="/sign-up"
              className="p-[12px_20px] bg-white rounded-full font-semibold"
            >
              Daftar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
