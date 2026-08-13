function formatarData(valor) {
  if (!valor) {
    return '-'
  }

  return new Date(valor).toLocaleDateString('pt-BR')
}

export default function CargoList({ cargos }) {
  if (cargos.length === 0) {
    return <p className="lista-vazia">Nenhum cargo cadastrado ainda.</p>
  }

  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Data de criação</th>
          </tr>
        </thead>
        <tbody>
          {cargos.map((cargo) => (
            <tr key={cargo.id}>
              <td>{cargo.nome}</td>
              <td>{cargo.descricao}</td>
              <td>{formatarData(cargo.dataCriacao)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
