function formatarData(valor) {
  if (!valor) {
    return '-'
  }

  return new Date(valor).toLocaleDateString('pt-BR')
}

function IconeEditar() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export default function CargoList({ cargos, onEditar, onExcluir, cargosEmUso }) {
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
            {(onEditar || onExcluir) && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {cargos.map((cargo) => {
            const emUso = cargosEmUso?.has(cargo.id)

            return (
              <tr key={cargo.id}>
                <td>{cargo.nome}</td>
                <td>{cargo.descricao}</td>
                <td>{formatarData(cargo.dataCriacao)}</td>
                {(onEditar || onExcluir) && (
                  <td>
                    <div className="tabela-acoes">
                      {onEditar && (
                        <button
                          type="button"
                          className="botao-icone"
                          onClick={() => onEditar(cargo)}
                          aria-label={`Editar ${cargo.nome}`}
                          title="Editar"
                        >
                          <IconeEditar />
                        </button>
                      )}
                      {onExcluir && (
                        <button
                          type="button"
                          className="botao-icone botao-icone-perigo"
                          onClick={() => onExcluir(cargo.id)}
                          disabled={emUso}
                          aria-label={`Excluir ${cargo.nome}`}
                          title={emUso ? 'Não é possível excluir: há pessoas com este cargo.' : 'Excluir'}
                        >
                          <IconeLixeira />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
