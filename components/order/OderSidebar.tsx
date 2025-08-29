import CategoryIcon from "@/components/ui/CategoryIcon";
import { prisma } from "@/src/lib/prisma";

export default async function OderSidebar() {
  const categories = await prisma.category.findMany()
  // await getCategories();
  return (
    <aside className="md:w-72 md:h-screen bg-white">
      {categories.map(category =>
        <CategoryIcon key={category.id} category={category} />
      )}
    </aside>
  )
}
