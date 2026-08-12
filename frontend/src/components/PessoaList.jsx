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
    <div className="pessoa-grid">
      {pessoas.map((pessoa) => (
        <article className="pessoa-card" key={pessoa.id}>
          <div className="pessoa-card-imagem" aria-hidden="true">
            <span>{pessoa.nome?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="pessoa-card-corpo">
            <span className="pessoa-card-tag">{pessoa.cargo?.nome || 'Sem cargo'}</span>
            <h3>{pessoa.nome}</h3>
            <p>
              {pessoa.idade ? `${pessoa.idade} anos · ` : ''}
              Admitido em {formatarData(pessoa.dataAdmissao)}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}
