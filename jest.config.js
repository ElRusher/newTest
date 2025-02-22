module.exports = {
  roots: ['<rootDir>/tests'], // Diretório onde estão os testes
  testEnvironment: 'node', // Ambiente de teste (Node.js)
  modulePaths: ['<rootDir>/src'], // Caminho base para resolução de módulos
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1', // Mapeamento personalizado (opcional)
  },
};