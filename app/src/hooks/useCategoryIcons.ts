const categories = [
  {
    name: '給料',
    type: 'income',
    icon: './icon/money.png',
  },
  {
    name: '住居費',
    type: 'expense',
    icon: './icon/house.png',
  },
  {
    name: '食費',
    type: 'expense',
    icon: './icon/food.png',
  },
  {
    name: '被服費',
    type: 'expense',
    icon: './icon/wear.png',
  },
];

export const useCategoryIcons = () => {
  const getCategoryIconSrc = (category: string) => {
    const categoryIconSrc = categories.filter((categoryData) => {
      return categoryData.name === category;
    });
    if(categoryIconSrc.length){
      return categoryIconSrc[0].icon;
    }
    return "";
  };

  return {getCategoryIconSrc}
};
