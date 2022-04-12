import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'

function GateSVG({ id }) {
   switch (id % 4) {
      case 3:
         return (
            <svg height="50" width="70"> line
               <line x1="0" y1="25" x2="70" y2="25" stroke="rgb(0,0,0)" strokeWidth="2" />
               Sorry, your browser does not support inline SVG.
            </svg>
         )
      case 1:
         return (//1: up, 2: down, 3: all
            <svg height="50" width="70"> black
               <line x1="0" y1="25" x2="70" y2="25" stroke="rgb(0,0,0)" strokeWidth="2" />
               <circle cx="35" cy="25" r="5" stroke="black" strokeWidth="1" fill="black" />
               {(parseInt(id / 4) == 1) && (<line x1="35" y1="0" x2="35" y2="25" stroke="rgb(0,0,0)" strokeWidth="2" />)}
               {(parseInt(id / 4) == 2) && (<line x1="35" y1="25" x2="35" y2="0" stroke="rgb(0,0,0)" strokeWidth="2" />)}
               {(parseInt(id / 4) == 3) && (<line x1="35" y1="0" x2="35" y2="50" stroke="rgb(0,0,0)" strokeWidth="2" />)}
               Sorry, your browser does not support inline SVG.
            </svg>
         )
      case 0:
         return (
            <svg height="50" width="70"> white
               <line x1="0" y1="25" x2="70" y2="25" stroke="rgb(0,0,0)" strokeWidth="2" />
               <circle cx="35" cy="25" r="5" stroke="black" strokeWidth="1" fill="white" />
               {(parseInt(id / 4) == 1) && (<line x1="35" y1="0" x2="35" y2="50" stroke="rgb(0,0,0)" strokeWidth="2" />)}
               {(parseInt(id / 4) == 2) && (<line x1="35" y1="0" x2="35" y2="50" stroke="rgb(0,0,0)" strokeWidth="2" />)}
               {(parseInt(id / 4) == 3) && (<line x1="35" y1="0" x2="35" y2="50" stroke="rgb(0,0,0)" strokeWidth="2" />)}
               Sorry, your browser does not support inline SVG.
            </svg>
         )
      case 2:
         return (
            <svg height="50" width="70"> not
               <circle cx="35" cy="25" r="15" stroke="black" strokeWidth="1" fill="white" />
               <line x1="0" y1="25" x2="70" y2="25" stroke="rgb(0,0,0)" strokeWidth="2" />
               <line x1="35" y1="10" x2="35" y2="40" stroke="rgb(0,0,0)" strokeWidth="2" />
               {(parseInt(id / 4) == 1) && (<line x1="35" y1="0" x2="35" y2="50" stroke="rgb(0,0,0)" strokeWidth="2" />)}
               {(parseInt(id / 4) == 2) && (<line x1="35" y1="0" x2="35" y2="50" stroke="rgb(0,0,0)" strokeWidth="2" />)}
               {(parseInt(id / 4) == 3) && (<line x1="35" y1="0" x2="35" y2="50" stroke="rgb(0,0,0)" strokeWidth="2" />)}
               Sorry, your browser does not support inline SVG.
            </svg>
         )
      default:
         return (
            id
         )
   }

}
function GateUnit({ id, row_pos, col_pos, setGate, bit_label }) {
   // console.log(row_pos, col_pos);
   return (
      <button className="gate_unit" onClick={() => setGate(row_pos, col_pos, id)}>
         {/* {id}, {row_pos}, {col_pos} */}
         <GateSVG id={id} />
         <div className="bit_label">{bit_label >= 0 ? bit_label : ''}</div>
      </button>
   )
}
function RowGates({ row_pos, row_arr, setGate, row_result_bit }) {
   const style = {
      display: 'flex'
   };
   return (
      <div className="row_gates" style={style}>
         {
            row_arr.map((v, i) => {
               return <GateUnit
                  id={v} row_pos={row_pos}
                  col_pos={i}
                  setGate={setGate}
                  bit_label={row_result_bit[i]}
               />
            })
         }
      </div>

   )
}
function BitUnit({ id }) {
   return (
      <div className="bit_unit_in">
         {id}
      </div>
   )
}

function AllGates() {
   const [all_gates_arr, setAllGates] = useState(
      [
         [0, 2, 3],
         [2, 0, 3]
      ]
   );
   const [all_bits_arr, setAllBits] = useState(
      []
   );
   const [result_bit, setResultBits] = useState(
      [[-1, -1, -1],
      [-1, -1, -1]]
   );
   const [row_num, setRowNum] = useState(2);
   const [col_num, setColNum] = useState(3);
   const [table, setTable] = useState([]);

   const [displayText, setDisplayText] = useState(false);
   const [binary, setBinary] = useState(true);

   function appendRow() {
      setTable([]);
      let newArr = [...all_gates_arr]; // copying the old datas array
      let new_row_array = Array(col_num).fill(3)
      newArr.push(new_row_array);
      let newArr2 = Array.from({ length: row_num + 1 }, _ => new Array(col_num).fill(-1));
      setResultBits(newArr2);
      setRowNum(pre => pre + 1);
      setAllGates(newArr);
      setAllBits([]);
      setTable([]);


   }

   function appendCol() {
      let newArr = [...all_gates_arr];
      newArr.map((v, i) => {
         newArr[i].push(3)
      })
      let newArr2 = Array.from({ length: row_num }, _ => new Array(col_num + 1).fill(-1));
      setResultBits(newArr2);
      setColNum(pre => pre + 1);
      setAllGates(newArr);
      setAllBits([]);
      setTable([]);


   }

   function delRow() {
      let newArr = [...all_gates_arr]; // copying the old datas array
      newArr.splice(row_num - 1, 1);
      setRowNum(pre => pre - 1);
      setAllGates(newArr);
      setAllBits([]);
      let newArr2 = Array.from({ length: row_num }, _ => new Array(col_num).fill(-1));
      setResultBits(newArr2);
      setTable([]);

   }

   function delCol() {
      let newArr = [...all_gates_arr];
      newArr.map((v, i) => {
         newArr[i].splice(col_num - 1, 1);
      })
      setColNum(pre => pre - 1);
      setAllGates(newArr);
      setAllBits([]);
      let newArr2 = Array.from({ length: row_num }, _ => new Array(col_num).fill(-1));
      setResultBits(newArr2);
      setTable([]);

   }

   function setGate(row_pos, col_pos, id) {
      setTable([]);
      if (id < 3) ++id;
      else id = 0;
      let newArr = [...all_gates_arr]; // copying the old datas array
      newArr[row_pos][col_pos] = id;
      setAllGates(newArr);

      //reset result bit
      let newArr2 = Array.from({ length: row_num }, _ => new Array(col_num).fill(-1));
      setResultBits(newArr2);
   }

   function compute(bit_arr) {
      console.log('compute')
      let not_bit_pos = [];
      let control_not = true;

      //新的result arr
      let newArr = Array.from({ length: row_num }, _ => new Array(col_num).fill(-1));
      // console.log(newArr);
      for (var j = 0; j < col_num; ++j) {
         control_not = true;
         not_bit_pos = [];

         for (var i = 0; i < row_num; ++i) {
            // console.log(bit_arr[i], all_gates_arr[i][j]);
            if (all_gates_arr[i][j] == 3) { //line
               continue;//略過
            }
            if (all_gates_arr[i][j] == 2) { //not
               not_bit_pos.push(i); //記住是哪個bit要not
            }
            else if (bit_arr[i] != all_gates_arr[i][j]) {//不符合control
               control_not = false;
               break
            }

         }
         if (control_not && not_bit_pos.length == 1) {
            bit_arr[not_bit_pos[0]] = bit_arr[not_bit_pos[0]] == 0 ? 1 : 0
         }
         else if (not_bit_pos.length > 1) {
            for (let n = 0; n < not_bit_pos.length; ++n) {
               bit_arr[not_bit_pos[n]] = bit_arr[not_bit_pos[n]] == 0 ? 1 : 0
            }
         }
         for (let row_i = 0; row_i < row_num; row_i++) {
            newArr[row_i][j] = bit_arr[row_i];
         }
         // console.log(newArr);
         // setResultBits(newArr);
         // console.log(all_bits_arr);
      }
      return newArr

   }

   function check() {
      //control一定要有not
      //one gate only have one not
      let control = false;
      let not = 0;
      for (var j = 0; j < col_num; ++j) {
         control = false;
         not = 0;
         for (var i = 0; i < row_num; ++i) {
            if (all_gates_arr[i][j] == 0 || all_gates_arr[i][j] == 1) {
               control = true;
            }
            else if (all_gates_arr[i][j] == 2) {
               // if (not) {
               //    alert("第" + (j + 1) + "個gate有誤，一個gate只能有一個not");
               //    return false;
               // }
               not += 1;
            }
         }
         if (control) {
            if (not == 0) {
               alert("第" + (j + 1) + "個gate有誤，control 需要搭配not");
               return false;
            }
            else if (not > 1) {
               alert("第" + (j + 1) + "個gate有誤，有control時，not只能有一個");
               return false;
            }
         }

      }

      return true
   }

   function DecToBinary(i, num) {
      let b = [i % 2]
      for (; num > 1; num--) {
         i = parseInt(i / 2);
         b.push(i % 2);
      }
      return b.reverse()
   }


   function stepByStep(i) {
      // alert(DecToBinary(i, row_num));
      setAllBits(DecToBinary(i, row_num));
      setResultBits(compute(DecToBinary(i, row_num)));

   }

   function genTable() {

      if (!check()) return;
      let table = []
      for (let i = 0; i < Math.pow(2, row_num); ++i) {
         // let bit = DecToBinary(i, row_num);
         // let res = compute(bit);
         console.log(compute(DecToBinary(i, row_num)).flatMap(x => x[col_num - 1]).join(''));
         table.push(
            <tr onClick={() => stepByStep(i)}>
               <th>{binary ? DecToBinary(i, row_num) : i}</th>
               <th>{binary ? compute(DecToBinary(i, row_num)).map(x => x[col_num - 1]) : parseInt(compute(DecToBinary(i, row_num)).flatMap(x => x[col_num - 1]).join(''), 2)}</th>
            </tr>
         )
      }
      setTable(table);
      stepByStep(0);

   }

   return (
      <div>

         <div style={{ display: 'flex' }}>
            <div style={{ margin: '20px' }}>
               Table
               <table class="res_table">
                  <tr>
                     <th>input</th>
                     <th>output</th>
                  </tr>
                  {table}
               </table>
            </div>
            <div style={{ margin: '20px' }}>
               <div style={{ marginRight: '20px' }}>Control</div>
               <button className="button-8" onClick={genTable}>產生table</button>
               <button className="button-8" onClick={appendRow}>加bit</button>
               <button className="button-8" onClick={delRow}>減bit</button>
               <button className="button-8" onClick={appendCol}>加gate</button>
               <button className="button-8" onClick={delCol}>減gate</button>
               <button className="button-8" onClick={() => { setBinary(pre => !pre) }}>轉{binary ? '二' : '十'}進位</button>
               <button className="button-8" onClick={() => setDisplayText(true)}>使用文字輸入</button>

               {
                  all_gates_arr.map((v, i) => {
                     return (
                        <div className="row">
                           <BitUnit id={all_bits_arr[i]} />
                           <RowGates
                              row_pos={i}
                              row_arr={v}
                              setGate={setGate}
                              row_result_bit={result_bit[i]}
                           />
                        </div>
                     )
                  })
               }
            </div>
         </div>

         <TextInput
            setAllGates={setAllGates}
            all_gates_arr={all_gates_arr}
            setDisplayText={setDisplayText}
            displayText={displayText}
            setColNum={setColNum}
            setRowNum={setRowNum}
            setResultBits={setResultBits}
            setAllBits={setAllBits}
            setTable={setTable}
         />


      </div>
   )
}
function TextInput(
   { setTable, setAllGates, all_gates_arr, setDisplayText, displayText, setColNum, setRowNum, setResultBits, setAllBits }
) {
   const [text, setText] = useState(arrToStr(all_gates_arr));

   useEffect(() => {
      setText(arrToStr(all_gates_arr));
      console.log(text);
   }, [all_gates_arr]);

   // console.log(text.split('\n').map((v, i) => v.split(' ')));
   // console.log(displayText);

   function inputText() {
      let newArr = text.split('\n').filter(function (obj) {
         return obj.trim() != '';
      }).map(function (obj) {
         return obj.trim().split(/\s+/).flatMap((v) => parseInt(v))
      });

      for (let i = 1; i < newArr.length; ++i) {
         if (newArr[0].length != newArr[i].length) {
            alert("gate 的長度不一，請重填");
            return
         }
      }

      // console.log(newArr);

      setColNum(newArr[0].length);
      setRowNum(newArr.length);
      setAllGates(newArr);
      setResultBits(Array.from({ length: newArr.length }, _ => new Array(newArr[0].length).fill(-1)));
      setAllBits(Array(newArr.length).fill(''));
      setTable([]);
      setDisplayText(false);


   }

   function arrToStr(arr) {
      // console.log(all_gates_arr);
      let text = "";
      for (let i = 0; i < arr.length; ++i) {
         for (let j = 0; j < arr[0].length; ++j) {
            text += arr[i][j] + ' ';
         }
         text += '\n';
      }
      // console.log(text);
      return text;
   }

   return (

      <div>
         <div className="word_block" style={{ display: displayText ? 'block' : 'none' }}>
            <span onClick={() => setDisplayText(false)} class="close fat"></span>
            <div style={{ display: 'flex' }}>
               <textarea
                  onChange={e => setText(e.target.value)}
                  name="mytext"
                  rows="15"
                  cols="40"
                  required
                  value={text}
               >
               </textarea>
               <div style={{ height: '100%' }}>
                  左方為輸入框
                  <table>
                     <tr>
                        <td>0</td>
                        <td>代表 0 control</td>
                     </tr>
                     <tr>
                        <td>1</td>
                        <td>代表 1 control</td>
                     </tr>
                     <tr>
                        <td>2</td>
                        <td>代表not</td>
                     </tr>
                     <tr>
                        <td>3</td>
                        <td>代表不做運算</td>
                     </tr>
                  </table>
                  <button className="button-8" onClick={inputText}>輸入</button>

               </div>
            </div>
         </div>

      </div>
   )
}
//使用ReactDOM.render把剛建立的物件element插入目標DOM中
ReactDOM.render(
   <AllGates />,
   // <TextInput />,
   document.getElementById('root')
);