// ホームページ
import { useEffect, useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Post } from './types'
import api from './axiosConfig'

// inerfaceによるpropsの型の設定
interface HomePageProps {
  filterCategory: string[];
  filterIncome: number | null;
  setFilterCategory:(category: string[])=> void;
  setFilterIncome:(income: number| null)=> void;
}


const HomePage: React.FC< HomePageProps > =({ filterCategory, filterIncome, setFilterCategory, setFilterIncome }) => {
  // 投稿データを保持
    const [posts, setPosts] = useState<Post[]>([]);

  // カテゴリーフィルターの選択・解除
  const handleCategoryChange = ( category: string) => {
    if (filterCategory?.includes(category)) {
      setFilterCategory(filterCategory.filter((c) => c !== category));
      } else {
      setFilterCategory([...filterCategory, category]);
      
    }
  };

  // 年収フィルターの選択・表示
  const[showIncomeOptions, setShowIncomeOptions] = useState(false);
  const handleIncomeSelect = (income: number | null ) => {
    setFilterIncome(income) ;
    setShowIncomeOptions(false);
  };

  // フィルタリング
  const filteredPosts = posts.filter(( post ) => {
    // カテゴリーフィルタリング
    const categoryMatch = filterCategory.length > 0 ? post.categories.some((cat) => filterCategory.includes(cat)) : true;
    // 年収フィルタリング
    const incomeMatch = filterIncome !== null ? post.income >= filterIncome : true;
    return categoryMatch && incomeMatch ;
    });

  // APIから投稿を取得
  useEffect(() => {
    api.get('/posts')
      .then(( response ) => {
        // console.log( "Date received:", response.data );
        setPosts(response.data);})
      .catch( error  => console.error( "Error fetching posts:", error));
  },[]);
  

  return (
    <>
      {/* ヘッダー */}
      <nav className='bg-blue-900 p-3 flex items-center'>
        <h1 className='text-2xl text-neutral-50 ml-2'>求人検索アプリ</h1>
        <div className='flex ml-auto'>
          <p className='text-1xl text-neutral-50 ml-2 mr-3 '>求人検索</p>
          <Link to="/post" className='text-1xl text-neutral-50 ml-2 mr-3'>求人投稿</Link>
        </div>
      </nav> 

      {/* フィルター欄 */}
      <main className='flex h-screen'>
        <div className='w-1/4 bg-blue-100'>
        
        {/* カテゴリーフィルター */}
          <h2 className='font-bold m-2'>求人カテゴリ</h2>
          {['事務','エンジニア','デザイン','マーケティング','財務・経理','人事','カスタマーサポート','製造','医療・介護'].map(( category ) =>(
            <div className='ml-2' key={category}>
            <input type="checkbox" id={ category } checked = {filterCategory?.includes( category)} onChange={() => handleCategoryChange(category)} className=' '/>
            <label className='text-sm' htmlFor={category}>{category}</label>
            </div>
          ))}
          <br />

        {/* 年収フィルター*/}
          <h2 className='font-bold m-2'>年収</h2>
          <div className='ml-4'>
            <button className='border border-neutral-950 bg-white w-[calc(100%-16px)]' onClick={() => setShowIncomeOptions((prev) => !prev)}>
              {filterIncome !== null ? `${filterIncome}万円以上 ▼` : "年収を選択 ▼"}
            </button>
            {showIncomeOptions && (
              <div>
                {[300,400,500,600,700,800,900,1000].map((income) => (
                  <div key={income} >
                   <input type="radio" name="income" value={income} checked={filterIncome === income} onChange={() => handleIncomeSelect(income)} className=''/>
                  <label >{income}万円以上</label>
                  </div>
                ))}
                  <div>
                   <input type="radio" name="income" value="" checked={filterIncome === null} onChange={() => handleIncomeSelect(null)} className=''/>
                  <label >  全て表示</label>
                  </div>
              </div>
            )}
           </div>
          </div>

        {/* 求人一覧 */}
        <div className='w-3/4'>
          <h1 className='font-bold text-xl ml-2 mt-2'>求人一覧</h1>
          <p className='ml-2 mb-4 text-sm'>該当件数 {filteredPosts.length} 件 </p>
          {filteredPosts.length > 0 ?(
            filteredPosts.map((post) => (
              <div key = { post.id } className ='border border-neutral-400 rounded-xl ml-4 mr-10'>
              <h2 className='font-bold text-lg ml-4'>{ post.title }</h2>
              <p className='text-sm ml-4'>カテゴリ： { post.categories.join(",") } </p>
              
              <p className='text-sm ml-4'>年収: { post.income } 万円</p>
              <br /><br />
              </div>
            ))
          ) : ( null )}

        </div>
        
      </main>
    </>
  
    
  )
}
export default HomePage