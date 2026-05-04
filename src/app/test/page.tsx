export default function TestPage() {
  return (
    <div style={{ padding: 50, fontFamily: 'Arial', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Servidor Funcionando!</h1>
      <p>Se você está vendo isso, o Next.js está OK.</p>
      <p>Data: {new Date().toLocaleString()}</p>
    </div>
  )
}
