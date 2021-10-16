import { PAGE_SIZE } from "@/common/contants";

// function asignArr(arr) {
//   let initArr = arr.map((item) => {
//     let obj = {
//       childern: [],
//     };
//     return Object.assign(item, obj);
//   });

//   return initArr;
// }

// export function handleComment(arr, arr2) {
//   const initArr = asignArr(arr);
// //   const initArr2 = asignArr(arr2);
//   let newArr = initArr.map((item, index) => {
//     if (item.pid === 0) {
//       return item;
//     } else {
//       arr.map((value, index) => {
//         if (value.id === item.pid) {
//           return value.childern.push(item);
//         }
//         // else{
//             // initArr2.map(value2=>{
//             //     if (value2.id === item.pid) {
//             //         return value2.childern.push(item);
//             //       }
//             // })
//         // }
//       });
//     }
//   });

//   const finalArr = newArr.filter((item) => item !== undefined);
//   return finalArr;
// }

export function handleComment(authList) {
  var min;
  for (var i = 0; i < authList.length; i++) {
    for (var j = i; j < authList.length; j++) {
      if (authList[i].id > authList[j].id) {
        min = authList[j];
        authList[j] = authList[i];
        authList[i] = min;
      }
    }
  }

  let menu = [];
  let map = {};
  authList.forEach((m) => {
    m.children = [];
    map[m.id] = m; // {1:菜单,2:菜单}
    console.log(typeof m.pid);

    if (m.pid === 0) {
      menu.push(m); // 如果是根 就直接push到menu中
    } else {
      map[m.pid] && map[m.pid].children.push(m);
      map[m.pid] && caSort(map[m.pid].children)
     
    }
  });
  return menu;
}

export function caSort(arr) {
  var max; //遍历数组，默认arr中的某一个元素为最大值，进行逐一比较
  for (var i = 0; i < arr.length; i++) {
    //外层循环一次，就拿arr[i] 和 内层循环arr.legend次的 arr[j] 做对比
    for (var j = i; j < arr.length; j++) {
      if (arr[i].id < arr[j].id) {
        //如果arr[j]大就把此时的值赋值给最大值变量max
        max = arr[j];
        arr[j] = arr[i];
        arr[i] = max;
      }
    }
  }

  return arr;
}

export function deDuplication(arr) {
  let deWeightThree = () => {
    let map = new Map();
    for (let item of arr) {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    }
    return [...map.values()];
  };
  let newarr = deWeightThree();
  return newarr;
}

export function sumPage(num) {
  let totalPage;
  if (Number.isSafeInteger(num / PAGE_SIZE)) {
    totalPage = num / PAGE_SIZE;
  } else {
    totalPage = Math.ceil(num / PAGE_SIZE);
  }
  return totalPage;
}
