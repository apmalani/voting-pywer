import React, { useState, ChangeEvent } from 'react';
import './CalculatorComponent.css';
import { Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface Player {
  name: string;
  weight: number;
  banzhaf: number;
  shapleyShubik: number;
}

const CalculatorComponent: React.FC = () => {
  const initialPlayers: Player[] = [
    { name: '1', weight: 4, banzhaf: 0.2381, shapleyShubik: 0.2333 },
    { name: '2', weight: 4, banzhaf: 0.2381, shapleyShubik: 0.2333 },
    { name: '3', weight: 4, banzhaf: 0.2381, shapleyShubik: 0.2333 },
    { name: '4', weight: 2, banzhaf: 0.1429, shapleyShubik: 0.1500 },
    { name: '5', weight: 2, banzhaf: 0.1429, shapleyShubik: 0.1500 },
    { name: '6', weight: 1, banzhaf: 0.0000, shapleyShubik: 0.0000 },
  ];

  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [quota, setQuota] = useState<number>(12);
  const [errorMsg, setErrorMsg] = useState<string | null>('');

  const isAddPlayerDisabled = players.length === 10;

  const updatePlayersState = (updatedPlayers: Player[]) => {
    setPlayers(updatedPlayers);
    calculateBanzhaf(updatedPlayers, quota);
    calculateShapleyShubik(updatedPlayers, quota);
  };

  const addPlayer = () => {
    const newPlayer: Player = {
      name: `${players.length + 1}`,
      weight: 0,
      banzhaf: 0,
      shapleyShubik: 0,
    };

    updatePlayersState([...players, newPlayer]);
  };

  const deletePlayer = (index: number) => {
    updatePlayersState(players.filter((_, i) => i !== index));
  };

  const weightSum = (coalition: number[]): number => {
    return coalition.reduce((sum, index) => sum + (players[index]?.weight || 0), 0);
  };

  const calculateBanzhaf = (updatedPlayers: Player[], quota: number) => {
    const totalPlayers = updatedPlayers.length;
    const winningCoalitions: number[][] = [];

    const weightSumWithoutPlayer = (coalition: number[]): number => {
      return coalition.reduce((sum, index) => sum + updatedPlayers[index].weight, 0);
    };

    for (let i = 1; i < (1 << totalPlayers); i++) {
      const coalition: number[] = [];
      let weightSum = 0;

      for (let j = 0; j < totalPlayers; j++) {
        if ((i & (1 << j)) !== 0) {
          coalition.push(j);
          weightSum += updatedPlayers[j].weight;
        }
      }

      if (weightSum >= quota) {
        winningCoalitions.push(coalition);
      }
    }

    const banzhafCounts: number[] = Array.from({ length: totalPlayers }, () => 0);

    for (const coalition of winningCoalitions) {
      for (const playerIndex of coalition) {
        const coalitionWithoutPlayer = coalition.filter((index) => index !== playerIndex);

        if (weightSumWithoutPlayer(coalitionWithoutPlayer) < quota) {
          banzhafCounts[playerIndex]++;
        }
      }
    }

    const totalCriticalCount = banzhafCounts.reduce((sum, count) => sum + count, 0);

    setPlayers((prevPlayers) =>
      prevPlayers.map((player, i) => ({
        ...player,
        banzhaf: totalCriticalCount > 0 ? banzhafCounts[i] / totalCriticalCount : 0,
      }))
    );
  };

  const isCrucial = (coalition: number[], playerI: number, quota: number): boolean => {
    const weightSumWithoutPlayerI = weightSum(coalition);
    const coalitionWithPlayerI = [...coalition, playerI];
    const weightSumWithPlayerI = weightSum(coalitionWithPlayerI);

    return weightSumWithoutPlayerI < quota && weightSumWithPlayerI >= quota;
  };

  const calculateShapleyShubik = (players: Player[], quota: number) => {
    const totalPlayers = players.length;
    const shapleyShubikValues: number[] = Array.from({ length: totalPlayers }, () => 0);

    const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

    const sequentialCoalitions: number[][] = [];

    const generateAllPermutations = (players: number[]): void => {
      if (players.length === totalPlayers) {
        sequentialCoalitions.push([...players]);
        return;
      }

      for (let i = 0; i < totalPlayers; i++) {
        if (!players.includes(i)) {
          generateAllPermutations([...players, i]);
        }
      }
    };

    generateAllPermutations([]);

    for (const coalition of sequentialCoalitions) {
      for (let i = 0; i < totalPlayers; i++) {
        const positionI = coalition.indexOf(i) + 1;
        const coalitionWithoutPlayerI = coalition.slice(0, positionI - 1);

        if (players[i].weight > 0) {
          if (isCrucial(coalitionWithoutPlayerI, i, quota)) {
            shapleyShubikValues[i] += 1;
          }
        }
      }
    }

    const totalSequentialCoalitions = factorial(players.length);

    setPlayers((prevPlayers) =>
      prevPlayers.map((player, i) => ({
        ...player,
        shapleyShubik: shapleyShubikValues[i] / totalSequentialCoalitions,
      }))
    );
  };

  const onWeightChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newWeight = event.target.value === '' ? 0 : Number(event.target.value);
    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player, i) =>
        i === index ? { ...player, weight: newWeight } : player
      );
      updatePlayersState(updatedPlayers);
      return updatedPlayers;
    });
  };

  const onQuotaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuota = event.target.value === '' ? 0 : Number(event.target.value);
    setQuota(newQuota);
    updatePlayersState(players);
  };

  return (
    <div className="calculator-container">
      {players.length === 0 && <div>No players added yet.</div>}

      {players.length > 0 && (
        <div className="table-container">
          <div className="table-header">
            <h2>Voting Power Calculator</h2>
          </div>

          <Table hover className="player-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Weight</th>
                <th>Banzhaf</th>
                <th>Shapley-Shubik</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td>{player.name}</td>
                  <td>
                    <Form.Control
                      type="text"
                      value={player.weight === 0 ? '' : player.weight}
                      className="input-right"
                      onChange={(event: ChangeEvent<HTMLInputElement>) => onWeightChange(index, event)}
                    />
                  </td>
                  <td>{player.banzhaf.toFixed(4)}</td>
                  <td>{player.shapleyShubik.toFixed(4)}</td>
                  <td>
                    <Button variant="danger" onClick={() => deletePlayer(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="table-footer">
            <Button onClick={addPlayer} disabled={isAddPlayerDisabled}>
              Add Player
            </Button>
            <div className="quota-input">
              <Form.Group controlId="quota" className="form-group">
                <Form.Label className="form-label">Quota:</Form.Label>
                <Form.Control
                  type="text"
                  value={quota === 0 ? '' : quota}
                  className="small-input"
                  onChange={onQuotaChange}
                />
              </Form.Group>
            </div>
          </div>
        </div>
      )}

      {errorMsg && <div className="error-area">{errorMsg}</div>}
    </div>
  );
};

export default CalculatorComponent;
