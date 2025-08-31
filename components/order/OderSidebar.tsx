import CategoryIcon from "@/components/ui/CategoryIcon";
import Logo from "@/components/ui/Logo";
import { prisma } from "@/src/lib/prisma";

export default async function OderSidebar() {
  const categories = await prisma.category.findMany()
  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <Logo />
      {categories.map(category =>
        <CategoryIcon key={category.id} category={category} />
      )}
    </aside>
  )
}
