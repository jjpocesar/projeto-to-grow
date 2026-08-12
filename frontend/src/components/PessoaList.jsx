function formatarData(valor) {
  if (!valor) {
    return '-'
  }

  return new Date(valor).toLocaleDateString('pt-BR')
}

function IconeLixeira() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
      <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
    </svg>
  )
}

export default function PessoaList({ pessoas, onExcluir }) {
  if (pessoas.length === 0) {
    return <p className="lista-vazia">Nenhuma pessoa cadastrada ainda.</p>
  }

  return (
    <div className="pessoa-grid">
      {pessoas.map((pessoa) => (
        <article className="pessoa-card" key={pessoa.id}>
          {onExcluir && (
            <button
              type="button"
              className="pessoa-card-excluir"
              onClick={() => onExcluir(pessoa.id)}
              aria-label={`Excluir ${pessoa.nome}`}
              title="Excluir"
            >
              <IconeLixeira />
            </button>
          )}

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
