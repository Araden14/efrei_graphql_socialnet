<script>
  let rows = 2;
  let cols = 3;
  let tableData = Array(rows).fill(null).map(() => Array(cols).fill(''));

  function addRow() {
    rows += 1;
    tableData = [...tableData, Array(cols).fill('')];
  }

  function addCol() {
    cols += 1;
    tableData = tableData.map(row => [...row, '']);
  }

  function updateValue(row, col, event) {
    tableData[row][col] = event.target.value;
    tableData = [...tableData]; // Trigger reactivity
  }
</script>

<h1>Dynamic Table</h1>

<button on:click={addRow}>Add Row</button>
<button on:click={addCol}>Add Column</button>

<table>
  {#each tableData as row, rowIndex}
    <tr>
      {#each row as cell, colIndex}
        <td>
          <input type="text" value={cell} on:input={(event) => updateValue(rowIndex, colIndex, event)} />
        </td>
      {/each}
    </tr>
  {/each}
</table>
