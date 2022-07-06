const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  let totalLikes = 0;
  blogs.forEach((post) => {
    totalLikes += post.likes;
  });
  return totalLikes;
};

const favoriteBlog = (blogs) => {
  const sortedArr = blogs.sort((a, b) => b.likes - a.likes);
  console.log(sortedArr[0]);
  return sortedArr[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
