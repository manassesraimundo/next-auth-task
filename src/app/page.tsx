import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Login</h1>
      <Link href={'/home'}>Home</Link>
      <Link href={'/login'}>Login</Link>
    </div>
  )
}
