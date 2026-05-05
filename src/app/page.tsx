// Página temporária - atualização em andamento
export default function Home() {
  return (
    <html>
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{ padding: 50, fontFamily: 'Arial, sans-serif', background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
          <h1>DelanoSpa - Em Construção</h1>
          <p>O site está sendo atualizado. Volte em breve!</p>
          <p>Data atual: {new Date().toLocaleString('pt-PT')}</p>
          <br/>
          <a href="/admin/login" style={{ color: '#a855f7', textDecoration: 'none' }}>→ Área Admin</a>
        </div>
      </body>
    </html>
  )
}
