import { useEffect } from 'react'
import { getFeedAPI } from 'apis/feed'
import { useInfiniteQuery } from 'react-query'
import { category, FeedResponse } from 'types'

interface Props {
  inView: boolean
  selectedCategory: category
}

const useFeed = ({ inView, selectedCategory }: Props) => {
  const size = window.innerWidth > 780 ? 12 : 5
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<FeedResponse>(
    ['feedList', selectedCategory],
    ({ pageParam = 0 }) => getFeedAPI({ pageParam, category: selectedCategory, size }),
    {
      getNextPageParam: (lastPage) => {
        if (!lastPage.isLast) return lastPage.nowPage + 1
        return undefined
      },
    }
  )

  const feedList = data?.pages
    .flat()
    .map((v) => v.feedList)
    .flat()
  const isEmpty = data?.pages[0]?.feedList.length === 0
  const isReachingEnd = isEmpty || (data && data.pages[data.pages.length - 1]?.isLast === true)
  const hasMorePosts = !isEmpty && !isReachingEnd
  const readToLoad = hasMorePosts && !isLoading

  useEffect(() => {
    if (inView && readToLoad) {
      fetchNextPage()
    }
  }, [inView, readToLoad, fetchNextPage])

  return { feedList, isLoading, readToLoad }
}

export default useFeed
