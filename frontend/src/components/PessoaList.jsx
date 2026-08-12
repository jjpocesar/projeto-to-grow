function formatarData(valor) {
  if (!valor) {
    return '-'
  }

  return new Date(valor).toLocaleDateString('pt-BR')
}

export default function PessoaList({ pessoas }) {
  if (pessoas.length === 0) {
    return <p className="lista-vazia">Nenhuma pessoa cadastrada ainda.</p>
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th>Cargo</th>
          <th>Data de admissão</th>
        </tr>
      </thead>
      <tbody>
        {pessoas.map((pessoa) => (
          <tr key={pessoa.id}>
            <td>{pessoa.nome}</td>
            <td>{pessoa.idade || '-'}</td>
            <td>{pessoa.cargo?.nome || '-'}</td>
            <td>{formatarData(pessoa.dataAdmissao)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
