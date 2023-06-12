import { useState } from "react";
import MatrixInput from "./MatrixInput";

const App: React.FC = () => {
  const [matrix, setMatrix] = useState<number[][]>([]);

  const handleMatrixChange = (updatedMatrix: number[][]) => {
    setMatrix(updatedMatrix);
  };

  function solveGauss(matrix: number[][]): number[] {
    const n = matrix.length;

    // Criar uma cópia da matriz original
    const augmentedMatrix = matrix.map((row) => [...row]);

    // Fase de eliminação
    for (let i = 0; i < n; i++) {
      // Pivô atual
      const pivot = augmentedMatrix[i][i];

      // Se o pivô for zero, trocar com uma linha abaixo que tenha um valor não zero na mesma coluna
      if (pivot === 0) {
        for (let j = i + 1; j < n; j++) {
          if (augmentedMatrix[j][i] !== 0) {
            [augmentedMatrix[i], augmentedMatrix[j]] = [
              augmentedMatrix[j],
              augmentedMatrix[i],
            ];
            break;
          }
        }
        // Se não houver uma linha abaixo com um valor não zero, o sistema é indeterminado ou impossível
        if (augmentedMatrix[i][i] === 0) {
          throw new Error(
            "O sistema de equações é indeterminado ou impossível."
          );
        }
      }

      // Normalizar a linha atual dividindo-a pelo valor do pivô
      for (let j = i; j < n + 1; j++) {
        augmentedMatrix[i][j] /= pivot;
      }

      // Reduzir as outras linhas
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          const factor = augmentedMatrix[j][i];
          for (let k = i; k < n + 1; k++) {
            augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
          }
        }
      }
    }

    // Extrair a solução do sistema
    const solution: number[] = [];
    for (let i = 0; i < n; i++) {
      solution.push(augmentedMatrix[i][n]);
    }

    return solution;
  }

  const handleSubmit = () => {
    // Aqui você pode chamar sua função `solveGauss` com a matriz como argumento
    // e fazer o que quiser com a solução
    console.log("Matriz:", matrix);
    const solution = solveGauss(matrix);
    console.log("Solução", solution);
  };

  return (
    <div className="App">
      <h1>Entrada da Matriz</h1>
      <MatrixInput
        size={3}
        onMatrixChange={handleMatrixChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default App;
