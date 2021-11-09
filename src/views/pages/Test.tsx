import React from 'react'
import { useGetMeQuery } from '../../generated/graphql';

interface Props {
    
}

const Test: React.FC = (props: Props) => {
    const { data, loading, error } = useGetMeQuery();
    if (loading) return <h1>LOADING</h1>
    if (data)
      console.log(data);
    if (error)
      console.log(error);
    
    // const { data, loading, error } = useGetUserQuery({
    //   variables: {id: '1'}
    // })
      
    // if (data)
    //   console.log(data);
    // console.log(error);
      
    
    return (
        <div>
          <h1>okokokoo</h1>  
        </div>
    )
}

export default Test
