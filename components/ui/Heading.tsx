
function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-2xl text-gray-600 m-8">
      {children}
    </h1>
  )
}

export default Heading