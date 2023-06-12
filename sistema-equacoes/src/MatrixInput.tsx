import { InputNumber, Row, Col, Button } from "antd";
import { useState } from "react";

interface MatrixInputProps {
  size: number;
  onMatrixChange: (matrix: number[][]) => void;
  onSubmit: () => void;
}

const MatrixInput: React.FC<MatrixInputProps> = ({
  size,
  onMatrixChange,
  onSubmit,
}) => {
  const [matrix, setMatrix] = useState<number[][]>(() => {
    const initialMatrix: number[][] = [];
    for (let i = 0; i < size; i++) {
      const row: number[] = [];
      for (let j = 0; j < size + 1; j++) {
        row.push(0); // Valor padrão, pode ser ajustado conforme necessário
      }
      initialMatrix.push(row);
    }
    return initialMatrix;
  });

  const handleInputChange = (
    value: number | undefined,
    row: number,
    col: number
  ) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[row][col] = value || 0;
    setMatrix(updatedMatrix);
    onMatrixChange(updatedMatrix);
  };

  const generateInputFields = () => {
    const inputFields: JSX.Element[] = [];
    for (let i = 0; i < size; i++) {
      const rowInputs = [];
      for (let j = 0; j < size + 1; j++) {
        rowInputs.push(
          <Col key={`${i}-${j}`}>
            {j !== size ? (
              <>
                {`a${i + 1}${j + 1} `}
                <InputNumber
                  onChange={(value) => {
                    handleInputChange(value as number, i, j);
                  }}
                />
              </>
            ) : (
              <>
                {"="}
                <span style={{ marginLeft: "10px" }} />
                {`b${i + 1} `}
                <InputNumber
                  onChange={(value) => {
                    handleInputChange(value as number, i, j);
                  }}
                />
              </>
            )}
          </Col>
        );
      }
      inputFields.push(
        <Row key={i} gutter={16} style={{ marginBottom: "8px" }}>
          {rowInputs}
        </Row>
      );
    }
    return inputFields;
  };

  return (
    <div>
      {generateInputFields()}
      <Button type="primary" onClick={onSubmit}>
        {"Calcular"}
      </Button>
    </div>
  );
};

export default MatrixInput;
