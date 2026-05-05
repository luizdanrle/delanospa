export default function Home() {
  return (
    <div style={{ padding: 50, fontFamily: 'Arial', background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      <h1>DelanoSpa - Em Construção</h1>
      <p>O site está sendo atualizado. Volte em breve!</p>
      <p>Data: {new Date().toLocaleString('pt-PT')}</p>
      <br/>
      <a href="/admin/login" style={{ color: '#a855f7' }}>Área Admin</a>
    </div>
  )
}
