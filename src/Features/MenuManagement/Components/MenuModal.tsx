// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import type { MenuItem } from '../Types';


// interface MenuModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onSave: (item: MenuItem) => void;
//     editingItem?: MenuItem;
// }

// export const MenuModal: React.FC<MenuModalProps> = ({
//     isOpen,
//     onClose,
//     onSave,
//     editingItem,
// }) => {
//     const [formData, setFormData] = useState({
//         name: editingItem?.name || '',
//         description: editingItem?.description || '',
//         category: editingItem?.category || '',
//         price: editingItem?.price || '',
//         dietInfo: editingItem?.dietInfo || 'Veg',
//         prepTime: editingItem?.prepTime || '',
//         rating: editingItem?.rating || '',
//         calories: editingItem?.calories || '',
//         status: editingItem?.status || 'Available',
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         const newItem: MenuItem = {
//             id: editingItem?.id || `M${Date.now()}`,
//             name: formData.name,
//             description: formData.description,
//             category: formData.category,
//             price: parseFloat(formData.price as any),
//             dietInfo: formData.dietInfo as any,
//             prepTime: parseInt(formData.prepTime as any),
//             rating: parseFloat(formData.rating as any),
//             calories: parseInt(formData.calories as any),
//             status: formData.status as any,
//         };

//         onSave(newItem);
//         setFormData({
//             name: '',
//             description: '',
//             category: '',
//             price: '',
//             dietInfo: 'Veg',
//             prepTime: '',
//             rating: '',
//             calories: '',
//             status: 'Available',
//         });
//         onClose();
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                 <div className="sticky top-0 bg-white p-4 md:p-6 border-b border-slate-200 flex justify-between items-center">
//                     <h2 className="text-lg md:text-xl font-bold text-[#1E3A8A]">
//                         {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
//                     </h2>
//                     <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
//                         <X size={20} />
//                     </button>
//                 </div>

//                 <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-slate-700 mb-1">Item Name *</label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
//                                 placeholder="Enter item name"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
//                             <select
//                                 name="category"
//                                 value={formData.category}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
//                             >
//                                 <option value="">Select category</option>
//                                 {MENU_CATEGORIES.map(cat => (
//                                     <option key={cat} value={cat}>{cat}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
//                         <textarea
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                             required
//                             rows={3}
//                             className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
//                             placeholder="Enter description"
//                         />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-slate-700 mb-1">Price ($) *</label>
//                             <input
//                                 type="number"
//                                 name="price"
//                                 value={formData.price}
//                                 onChange={handleChange}
//                                 required
//                                 min="0"
//                                 step="0.01"
//                                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
//                                 placeholder="0"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-slate-700 mb-1">Diet Info *</label>
//                             <select
//                                 name="dietInfo"
//                                 value={formData.dietInfo}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
//                             >
//                                 {DIET_OPTIONS.map(opt => (
//                                     <option key={opt} value={opt}>{opt}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-slate-700 mb-1">Prep Time (min) *</label>
//                             <input
//                                 type="number"
//                                 name="prepTime"
//                                 value={formData.prepTime}
//                                 onChange={handleChange}
//                                 required
//                                 min="0"
//                                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
//                                 placeholder="0"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-slate-700 mb-1">Rating (0-5) *</label>
//                             <input
//                                 type="number"
//                                 name="rating"
//                                 value={formData.rating}
//                                 onChange={handleChange}
//                                 required
//                                 min="0"
//                                 max="5"
//                                 step="0.1"
//                                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
//                                 placeholder="0"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-slate-700 mb-1">Calories *</label>
//                             <input
//                                 type="number"
//                                 name="calories"
//                                 value={formData.calories}
//                                 onChange={handleChange}
//                                 required
//                                 min="0"
//                                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
//                                 placeholder="0"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-slate-700 mb-1">Status *</label>
//                         <select
//                             name="status"
//                             value={formData.status}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20"
//                         >
//                             {STATUS_OPTIONS.map(opt => (
//                                 <option key={opt} value={opt}>{opt}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="flex gap-3 pt-4 border-t border-slate-200">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="flex-1 px-4 py-2 rounded-lg border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="flex-1 px-4 py-2 rounded-lg bg-[#1E3A8A] text-white font-bold hover:bg-[#1E3A8A]/90"
//                         >
//                             {editingItem ? 'Update' : 'Add'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };
