import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ResourceTable({ headers, rows, createHref, createLabel = 'Add New' }) {
    const [confirmDelete, setConfirmDelete] = useState(null);

    const handleDelete = (deleteUrl) => {
        router.delete(deleteUrl, { onSuccess: () => setConfirmDelete(null) });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-slate-500">{rows.length} record{rows.length !== 1 ? 's' : ''}</p>
                {createHref && (
                    <Link href={createHref} className="btn-primary text-sm py-2.5">
                        + {createLabel}
                    </Link>
                )}
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm font-body">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                {headers.map(h => (
                                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase whitespace-nowrap">
                                        {h}
                                    </th>
                                ))}
                                <th className="text-right px-5 py-3 text-xs font-semibold tracking-wider text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {rows.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                                    {row.cells.map((cell, ci) => (
                                        <td key={ci} className="px-5 py-4 text-slate-700">
                                            {cell}
                                        </td>
                                    ))}
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-3">
                                            {row.editHref && (
                                                <Link href={row.editHref} className="text-xs text-teal-600 hover:text-teal-700 font-medium">
                                                    Edit
                                                </Link>
                                            )}
                                            {row.deleteUrl && (
                                                confirmDelete === row.id ? (
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => handleDelete(row.deleteUrl)} className="text-xs text-red-600 font-semibold">Confirm</button>
                                                        <button onClick={() => setConfirmDelete(null)} className="text-xs text-slate-400">Cancel</button>
                                                    </div>
                                                ) : (
                                                    <button onClick={() => setConfirmDelete(row.id)} className="text-xs text-slate-400 hover:text-red-500 transition-colors">
                                                        Delete
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {rows.length === 0 && (
                        <p className="text-center text-slate-400 text-sm py-12">No records yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
