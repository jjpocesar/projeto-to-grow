function formatarData(valor) {
  if (!valor) {
    return '-'
  }

  return new Date(valor).toLocaleDateString('pt-BR')
}

function gerarTom(texto) {
  let hash = 0

  for (let i = 0; i < texto.length; i += 1) {
    hash = texto.charCodeAt(i) + ((hash << 5) - hash)
  }

  return Math.abs(hash) % 360
}

function IconeEditar() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  )
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

export default function PessoaList({ pessoas, onEditar, onExcluir }) {
  if (pessoas.length === 0) {
    return <p className="lista-vazia">Nenhuma pessoa cadastrada ainda.</p>
  }

  return (
    <div className="pessoa-grid">
      {pessoas.map((pessoa) => {
        const tom = gerarTom(pessoa.nome || 'To Grow')
        const gradiente = `linear-gradient(135deg, hsl(${tom}, 75%, 58%), hsl(${(tom + 45) % 360}, 70%, 40%))`

        return (
          <article className="pessoa-card" key={pessoa.id}>
            <div className="pessoa-card-acoes">
              {onEditar && (
                <button
                  type="button"
                  className="pessoa-card-acao"
                  onClick={() => onEditar(pessoa)}
                  aria-label={`Editar ${pessoa.nome}`}
                  title="Editar"
                >
                  <IconeEditar />
                </button>
              )}
              {onExcluir && (
                <button
                  type="button"
                  className="pessoa-card-acao pessoa-card-acao-perigo"
                  onClick={() => onExcluir(pessoa.id)}
                  aria-label={`Excluir ${pessoa.nome}`}
                  title="Excluir"
                >
                  <IconeLixeira />
                </button>
              )}
            </div>

            <div className="pessoa-card-imagem" aria-hidden="true" style={{ background: gradiente }}>
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
        )
      })}
    </div>
  )
}
