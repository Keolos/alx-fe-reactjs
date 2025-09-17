export default function UserCard({ user }) {
  // user is a GitHub API user object (login, avatar_url, html_url)
  return (
    <div className="border p-3 rounded flex items-center gap-4">
      <img src={user.avatar_url} alt={user.login} width={48} height={48} className="rounded-full" />
      <div>
        <a href={user.html_url} target="_blank" rel="noreferrer" className="font-semibold">{user.login}</a>
      </div>
    </div>
  )
}
