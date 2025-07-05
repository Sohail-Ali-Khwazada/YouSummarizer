

function Footer() {
  const curYear = new Date().getFullYear();
  return (

    <div className="flex justify-between px-8 pb-5 font-medium text-gray-400 tracking-wide"> 
      <div>&copy; Copyright {curYear} YouSummarizer Inc.</div>
      <div className="flex space-x-5 list-none">
        <li>Terms and Conditions</li>
        <li>Contact us</li>
        <li>Blogs</li>
      </div>
    </div>
  )
}

export default Footer
