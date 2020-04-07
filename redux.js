// REDUX CYCLE

// MODEL INSURANCE COMPANY
//Creators

const createPolicy = (name, amount) => {
    return {
     type: 'CREATE_POLICY',
     payload: {
         name: name,
         amount: amount
     }
    };
};


const deletePolicy = (name) => {
    return {
        type: 'DELETE_POLICY',
        payload: {
            name:name
        }
    };
};


const createClaim = (name, moneyToCollect) => {
    return {
        type: 'CREATE_CLAIM',
        payload: {
            name:name,
            moneyToCollect: moneyToCollect
        }
    };
};


// Reducers (Departments)

const claimHistory = (oldListOfClaims =[], action) => {
    if(action.type === 'CREATE_CLAIM') {
        return [...oldListOfClaims, action.payload];
    } 
    return oldListOfClaims;
};


const accounting = (bagOfMoney, action) => {
    if(action.type === 'CREATE_CLAIM') {
        return bagOfMoney - action.payload.moneyToCollect;
    } else if(action.type === 'CREATE_POLICY') {
        return bagOfMoney + action.payload.amount;    
    }
    return bagOfMoney;
};


const policies = (listOfPolicies = [], action) => {
      if(action.type === 'CREATE_POLICY') {
          return [...listOfPolicies, action,payload.name];
      }else if(action.type === 'DELETE_POLICY') {
          return listOfPolicies.filter(name => name !== action.payload.name);
      } 
      return listOfPolicies;
};


const {createStore, combineReducers} = redux;

const ourDepartments = combineReducers({
    accounting: accounting,
    claimHistory: claimHistory,
    policies: policies
});

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Mary', 20));
store.dispatch(createPolicy('Sheng', 30));
store.dispatch(createPolicy('TingSheng', 50));

store.dispatch(createClaim('Mary', 50));
store.dispatch(createClaim('Sheng', 40));

store.dispatch(deletePolicy('TingSheng'));

console.log(store.getState());