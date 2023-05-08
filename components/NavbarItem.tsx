interface NavbarProps {
  label: string
}

const NavbarItem: React.FC<NavbarProps> = ({label}) => {
  return(
    <div className="text-white cursor-pointer hover:bg-gray-300 transition ">
      {label}
    </div>
  )
}

export default NavbarItem