import React, { useState, ChangeEvent } from 'react';

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
    const [quota, setQuota] = useState<number | ''>(12);
    const [errorMsg, setErrorMsg] = useState<string | null>('');

    const isAddPlayerDisabled = !quota || isNaN(Number(quota)) || Number(quota) <= 0;

    // const gleanErrors = () => {
    //     let sum = 0;
    //     for (let i = 0; i < players.length; i++) {
    //       sum += players[i].weight;
    //     }
      
    //     if (sum < (quota as number)) {
    //       setErrorMsg("ERROR: Not enough votes to meet the quota.");
    //     } else if (players.length === 10) {
    //       setErrorMsg("WARNING: Max unique players reached.");
    //     } else {
    //       setErrorMsg(null);
    //     }
    //   };

    const addPlayer = () => {
        const newPlayer: Player = {
            name: `${players.length + 1}`,
            weight: 0,
            banzhaf: 0,
            shapleyShubik: 0,
        };
        setPlayers([...players, newPlayer]);
    };

    const deletePlayer = (index: number) => {
        const updatedPlayers = [...players];
        updatedPlayers.splice(index, 1);
        setPlayers(updatedPlayers);
    };

    const weightSum = (coalition: number[]): number => {
        return coalition.reduce((sum, index) => sum + players[index].weight, 0);
      };

    const calculateBanzhaf = () => {
        const totalPlayers = players.length;
        const winningCoalitions: number[][] = [];
      
        const weightSumWithoutPlayer = (coalition: number[]): number => {
          return coalition.reduce((sum, index) => sum + players[index].weight, 0);
        };
      
        // Generate all possible combinations of players (subsets)
        for (let i = 1; i < (1 << totalPlayers); i++) {
          const coalition: number[] = [];
          let weightSum = 0;
      
          // Check which players are in the current subset (coalition)
          for (let j = 0; j < totalPlayers; j++) {
            if ((i & (1 << j)) !== 0) {
              coalition.push(j);
              weightSum += players[j].weight;
            }
          }
      
          // Check if the coalition is a winning coalition
          if (weightSum >= (quota as number)) {
            winningCoalitions.push(coalition);
          }
        }
      
        // Calculate Banzhaf power for each player
        const banzhafCounts: number[] = Array.from({ length: totalPlayers }, () => 0);
      
        for (const coalition of winningCoalitions) {
          for (const playerIndex of coalition) {
            const coalitionWithoutPlayer = coalition.filter((index) => index !== playerIndex);
      
            // Check if the player is critical for the coalition
            if (weightSumWithoutPlayer(coalitionWithoutPlayer) < (quota as number)) {
              banzhafCounts[playerIndex]++;
            }
          }
        }
      
        // Normalize Banzhaf power values
        const totalCriticalCount = banzhafCounts.reduce((sum, count) => sum + count, 0);
      
        for (let i = 0; i < totalPlayers; i++) {
          if (banzhafCounts[i] === 0) {
            // Assuming 'players' state is managed using setPlayers
            setPlayers((prevPlayers) => {
              const updatedPlayers = [...prevPlayers];
              updatedPlayers[i].banzhaf = 0;
              return updatedPlayers;
            });
          } else {
            // Assuming 'players' state is managed using setPlayers
            setPlayers((prevPlayers) => {
              const updatedPlayers = [...prevPlayers];
              updatedPlayers[i].banzhaf = banzhafCounts[i] / totalCriticalCount;
              return updatedPlayers;
            });
          }
        }
      };

      const isCrucial = (coalition: number[], playerI: number): boolean => {
        const weightSumWithoutPlayerI = weightSum(coalition);
        const coalitionWithPlayerI = [...coalition, playerI];
        const weightSumWithPlayerI = weightSum(coalitionWithPlayerI);
      
        return weightSumWithoutPlayerI < (quota as number) && weightSumWithPlayerI >= (quota as number);
      };
      
      const calculateShapleyShubik = () => {
        const totalPlayers = players.length;
        const shapleyShubikValues: number[] = Array.from({ length: totalPlayers }, () => 0);
      
        const factorial = (n: number): number => {
          return n <= 1 ? 1 : n * factorial(n - 1);
        };
      
        // Step 1: List all sequential coalitions
        const sequentialCoalitions: number[][] = [];
      
        // Generate all permutations (orderings) of players
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
      
        // Step 2 and 3: Determine pivotal player in each sequential coalition
        for (const coalition of sequentialCoalitions) {
          for (let i = 0; i < totalPlayers; i++) {
            const positionI = coalition.indexOf(i) + 1;
            const coalitionWithoutPlayerI = coalition.slice(0, positionI - 1);
      
            // Check if the player is pivotal
            if (players[i].weight > 0) {
              if (isCrucial(coalitionWithoutPlayerI, i)) {
                shapleyShubikValues[i] += 1;
              }
            }
          }
        }
      
        // Step 4: Convert counts to fractions or decimals
        const totalSequentialCoalitions = factorial(totalPlayers);
      
        for (let i = 0; i < totalPlayers; i++) {
          setPlayers((prevPlayers) => {
            const updatedPlayers = [...prevPlayers];
            if (shapleyShubikValues[i] === 0) {
              updatedPlayers[i].shapleyShubik = 0;
            } else {
              updatedPlayers[i].shapleyShubik = shapleyShubikValues[i] / totalSequentialCoalitions;
            }
            return updatedPlayers;
          });
        }
      };
      

    const onWeightChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const updatedPlayers = [...players];
        updatedPlayers[index].weight = Number(event.target.value);
        calculateBanzhaf();
        calculateShapleyShubik();
        setPlayers(updatedPlayers);
    };

    const onQuotaChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newQuota = event.target.value;
        setQuota(newQuota as number | '');
        calculateBanzhaf();
        calculateShapleyShubik();
    };

    return (
    <div style={{ paddingLeft: '15px' }}>
      <div style={{ display: players.length === 0 ? 'block' : 'none' }}>
        No players added yet.
      </div>

      <table style={{ display: players.length > 0 ? 'table' : 'none' }} className="player-table">
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
              <td className="text-right">{player.name}</td>
              <td className="text-right">
                <input
                  type="number"
                  value={player.weight}
                  className="input-right"
                  onChange={(event) => onWeightChange(index, event)}
                />
              </td>
              <td className="text-right">{player.banzhaf.toFixed(4)}</td>
              <td className="text-right">{player.shapleyShubik.toFixed(4)}</td>
              <td>
                <button onClick={() => deletePlayer(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container-fluid" style={{ marginLeft: 0, marginRight: 0, width: '39%' }}>
        <div className="row">
          <div className="col-sm">
            <div className="new-player-area" style={{ paddingTop: '15px' }}>
              <button onClick={addPlayer} disabled={isAddPlayerDisabled}>
                Add Player
              </button>
            </div>
          </div>

          <div className="col-sm">
            <div className="error-area" style={{ paddingTop: '15px', color: 'red', fontWeight: 'bold' }}>
              {errorMsg}
            </div>
          </div>

          <div className="col-sm">
            <div className="quota-input">
              <label htmlFor="quota" style={{ marginRight: '5px', marginLeft: '0px' }}>
                Quota:
              </label>
              <input
                type="number"
                value={quota}
                id="quota"
                className="small-input"
                onChange={onQuotaChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorComponent;
