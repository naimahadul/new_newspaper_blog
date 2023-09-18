const blogSchema = (sequelize, DataTypes) => {
  const Blog = sequelize.define("Blog", {
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Blog;
};

export default blogSchema;
