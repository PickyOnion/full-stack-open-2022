const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  let totalLikes = 0;
  blogs.forEach((post) => {
    totalLikes += post.likes;
  });
  return totalLikes;
};

module.exports = {
  dummy,
  totalLikes,
};
