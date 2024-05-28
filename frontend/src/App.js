import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./componensts/SearchResult";

 export const BASE_URL ="http://localhost:9000";
function App() {
 
 

  const [data,setData]=useState(null);
  const[loading,setLoading]=useState(null);
  const [error,setError]=useState(null);
  const[FilteredData,setFilteredData]=useState(null);
  const [selectedBtn,setSelectedBtn]= useState("all");

useEffect(()=>{},[]);

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
  
        // Check if the data is an array or if it's nested inside another property
        const dataArray = Array.isArray(responseData) ? responseData : responseData.results;
  
        setData(dataArray);
        setFilteredData(dataArray);
        setLoading(false);
      } catch (error) {
        setError('Unable to fetch data');
        setLoading(false);
      }
    };
  
    fetchFoodData();
  }, []);
  
  console.log(data);
  const SearchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
  
    if (searchValue === " ") {
      setFilteredData(null);
    }
  
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  
    setFilteredData(filter);
  };
  const filterFood =(type)=>{
    if (type=="all"){
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);

  }
  const filterBtns =[
    {
      name:"all",
      type:"all",
    },
    {
      name:"breakfast",
      type:"breakfast",
    },
    {
      name:"lunch",
      type:"lunch",
    },
    {
      name:"dinner",
      type:"dinner",
    }
  ]

  return (
    <div className="App">
      <Cointainer>
        <TopContainer>
          <div className="logo">
            <img src="logo.svg"/>
          </div>
          <div className="search">
            <input 
            onChange={SearchFood}
            placeholder="search here...."
            />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtns.map((value)=>(
            <Button  onClick={()=>filterFood(value.type)}>
            {value.name}
          </Button>
          ))}
          
        </FilterContainer>
        </Cointainer>
        <SearchResult data={FilteredData}/>
      
    </div>
  );
}


export default App;

export const  Cointainer =styled.div`

margin :0 auto;
min-width:1200px;
`;
const TopContainer= styled.section`
height: 140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;


.search {
  input {
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
    &::placeholder {
      color: white;
    }
  }
}
`;

const FilterContainer =styled.section`
display:flex;
justify-content: center;
gap :12px;
padding-bottom: 40px;
`;

 export const Button = styled.button`
background: #ff4343;
padding: 6px 12px;
border-radius: 5px;
border:none;
color:white;
cursor:pointer;
&:hover{
  background-color:#f22f2f;
}
`;

