export default function TestUser({ user, email, password }) {
  return (
    <div>
      <h4>{user}</h4>
      <p>Email: {email}</p>
      <p>Password: {password}</p>
    </div>
  );
}
