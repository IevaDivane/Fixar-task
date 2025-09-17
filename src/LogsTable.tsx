import React, { useState, useEffect } from 'react';
import type { LogEntry } from './api';
import { apiService } from './api';
import {
  Button,
  Input,
  Textarea,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure
} from '@heroui/react';
import { PaginationComponent } from './components/PaginationComponent';
import { MobileLogCard } from './components/MobileLogCard';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';
import { useToast } from './components/ToastProvider';
import { LoadingStates } from './components/LoadingSpinner';

// Convert API LogEntry (with string dates) to local LogEntry (with Date objects)
interface LocalLogEntry {
  id: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  logText: string;
}

// Helper function to convert API response to local format
function convertToLocalLog(apiLog: LogEntry): LocalLogEntry {
  return {
    ...apiLog,
    createdAt: new Date(apiLog.createdAt),
    updatedAt: new Date(apiLog.updatedAt)
  };
}

interface LogsTableProps { }

export const LogsTable: React.FC<LogsTableProps> = () => {
  const [logs, setLogs] = useState<LocalLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editingLogs, setEditingLogs] = useState<Set<string>>(new Set());
  const [savingLogs, setSavingLogs] = useState<Set<string>>(new Set());
  const [deletingLogs, setDeletingLogs] = useState<Set<string>>(new Set());
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [logToDelete, setLogToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const { showSuccess, showError } = useToast();

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Load logs from API
  const loadLogs = async (): Promise<void> => {
    setIsLoading(true);

    const response = await apiService.getLogs();

    if (response.success && response.data) {
      setLogs(response.data.map(convertToLocalLog));
    } else {
      showError('Failed to load logs: ' + (response.error || 'Unknown error'));
    }

    setIsLoading(false);
  };

  const addNewLog = (): void => {
    const newLog: LocalLogEntry = {
      id: 'temp-' + generateId(),
      owner: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      logText: ''
    };

    setLogs(prevLogs => [newLog, ...prevLogs]); // Add new log at the beginning

    // New log will always be on page 1 (first page)
    setCurrentPage(1);

    // Scroll to the new log after a short delay to ensure it's rendered
    setTimeout(() => {
      const newLogElement = document.getElementById(`log-${newLog.id}`);
      if (newLogElement) {
        newLogElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);

    startEditing(newLog.id);
  };

  const saveLog = async (logId: string): Promise<void> => {
    const log = logs.find(l => l.id === logId);
    if (!log) return;

    const owner = log.owner.trim();
    const logText = log.logText.trim();

    if (!owner || !logText) {
      showError('Owner and log text are required');
      return;
    }

    // Add to saving logs
    setSavingLogs(prev => new Set(prev).add(logId));

    try {
      let response: any;

      if (logId.startsWith('temp-')) {
        // Create new log
        response = await apiService.createLog(owner, logText);
        if (response.success && response.data) {
          // Replace temporary log with real one
          setLogs(prevLogs =>
            prevLogs.map(l => l.id === logId ? convertToLocalLog(response.data!) : l)
          );
          showSuccess('Log created successfully!');
        }
      } else {
        // Update existing log
        response = await apiService.updateLog(logId, owner, logText);
        if (response.success && response.data) {
          setLogs(prevLogs =>
            prevLogs.map(l => l.id === logId ? convertToLocalLog(response.data!) : l)
          );
          showSuccess('Log updated successfully!');
        }
      }

      if (!response.success) {
        throw new Error(response.error || 'Save failed');
      }

      // Exit editing mode after successful save
      setEditingLogs(prev => {
        const newSet = new Set(prev);
        newSet.delete(logId);
        return newSet;
      });
    } catch (error) {
      showError('Failed to save log: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      // Remove from saving logs
      setSavingLogs(prev => {
        const newSet = new Set(prev);
        newSet.delete(logId);
        return newSet;
      });
    }
  };

  const confirmDelete = (logId: string): void => {
    setLogToDelete(logId);
    onDeleteOpen();
  };

  const deleteLog = async (): Promise<void> => {
    if (!logToDelete) return;

    // Add to deleting logs
    setDeletingLogs(prev => new Set(prev).add(logToDelete));

    // Skip API call for temporary logs
    if (logToDelete.startsWith('temp-')) {
      setLogs(prevLogs => prevLogs.filter(log => log.id !== logToDelete));
      showSuccess('Log deleted successfully!');
      onDeleteClose();
      setLogToDelete(null);
      setDeletingLogs(prev => {
        const newSet = new Set(prev);
        newSet.delete(logToDelete);
        return newSet;
      });
      return;
    }

    try {
      const response = await apiService.deleteLog(logToDelete);

      if (response.success) {
        setLogs(prevLogs => prevLogs.filter(log => log.id !== logToDelete));
        showSuccess('Log deleted successfully!');
      } else {
        throw new Error(response.error || 'Delete failed');
      }
    } catch (error) {
      showError('Failed to delete log: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      onDeleteClose();
      setLogToDelete(null);
      setDeletingLogs(prev => {
        const newSet = new Set(prev);
        newSet.delete(logToDelete);
        return newSet;
      });
    }
  };

  const updateLogField = (logId: string, field: 'owner' | 'logText', value: string): void => {
    setLogs(prevLogs =>
      prevLogs.map(log =>
        log.id === logId ? { ...log, [field]: value } : log
      )
    );
  };

  const startEditing = (logId: string): void => {
    setEditingLogs(prev => new Set(prev).add(logId));
  };

  const cancelEditing = (logId: string): void => {
    setEditingLogs(prev => {
      const newSet = new Set(prev);
      newSet.delete(logId);
      return newSet;
    });
    // Reload the log to reset any unsaved changes
    loadLogs();
  };

  const isEditing = (logId: string): boolean => {
    return editingLogs.has(logId);
  };

  const isSaving = (logId: string): boolean => {
    return savingLogs.has(logId);
  };

  const isDeleting = (logId: string): boolean => {
    return deletingLogs.has(logId);
  };

  // Pagination logic
  const totalPages = Math.ceil(logs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogs = logs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  // Reset to first page when logs change
  useEffect(() => {
    setCurrentPage(1);
  }, [logs.length]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex justify-center items-center">
            <h2 className="text-xl font-semibold text-gray-900">Logs Table</h2>
          </div>
          <div className="flex justify-end items-center">
            <Button color="primary" disabled className="text-gray-900 p-2 focus:outline-none focus:ring-0 border-2 border-transparent hover:border-blue-500 transition-all duration-200 rounded-lg">
              Add New Log
            </Button>
          </div>
        </div>
        <div className="px-6 py-8">
          <LoadingStates.PageLoading />
        </div>
      </div>
    );
  }

  return (
    <>
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={deleteLog}
      />

      <div className="bg-white rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex justify-center items-center">
            <h2 className="text-xl font-semibold text-gray-900">Logs Table</h2>
          </div>
          <div className="flex justify-end items-center py-3">
            <Button color="primary" onPress={addNewLog} className="text-gray-900 p-2 focus:outline-none focus:ring-0 border-2 border-transparent hover:border-blue-500 transition-all duration-200 rounded-lg">
              Add New Log
            </Button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table aria-label="Logs table" removeWrapper className="w-full">
            <TableHeader>
              {['Owner', 'Created At', 'Updated At', 'Log Text', 'Actions'].map(header => (
                <TableColumn key={header} className={`text-[#fff] bg-[#224F92] p-2 ${header === 'Actions' ? 'text-center' : 'text-left'}`}>
                  {header}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {currentLogs.map((log, index) => {
                const editing = isEditing(log.id);
                const buttonClass = "h-auto text-gray-900 p-2 focus:outline-none focus:ring-0 border-2 border-transparent transition-all duration-200 rounded-lg";
                
                return (
                  <TableRow key={log.id} id={`log-${log.id}`} className={`${index % 2 === 0 ? "bg-[#e9ecf2]" : "bg-[#f8f9fa]"} table-row-hover transition-all duration-200`}>
                    <TableCell className="p-2 text-left text-gray-900">
                      {editing ? (
                        <Input
                          value={log.owner}
                          onChange={(e) => updateLogField(log.id, 'owner', e.target.value)}
                          placeholder="Enter owner name"
                          classNames={{ input: "p-1 border border-gray-500 min-w-[200px]", inputWrapper: "p-0 h-auto" }}
                          size="sm"
                        />
                      ) : (
                        <span className="text-gray-900">{log.owner || 'No owner'}</span>
                      )}
                    </TableCell>
                    <TableCell className="p-2 text-left">
                      <span className="text-gray-900">{formatDate(log.createdAt)}</span>
                    </TableCell>
                    <TableCell className="p-2 text-left">
                      <span className="text-gray-900">{formatDate(log.updatedAt)}</span>
                    </TableCell>
                    <TableCell className="p-2 text-left text-gray-900">
                      {editing ? (
                        <Textarea
                          value={log.logText}
                          onChange={(e) => updateLogField(log.id, 'logText', e.target.value)}
                          placeholder="Enter log text"
                          minRows={2}
                          classNames={{ input: "p-1 border border-gray-500 min-w-[300px]", inputWrapper: "p-0 h-auto" }}
                          size="sm"
                        />
                      ) : (
                        <span className="text-gray-900 whitespace-pre-wrap">{log.logText || 'No log text'}</span>
                      )}
                    </TableCell>
                    <TableCell className="p-2 text-right">
                      <div className="flex gap-2 justify-center">
                        {editing ? (
                          <>
                            <Button color="success" size="sm" onPress={() => saveLog(log.id)} disabled={isSaving(log.id)} className={`${buttonClass} hover:border-green-500`}>
                              {isSaving(log.id) ? <LoadingStates.SaveLoading /> : 'Save'}
                            </Button>
                            <Button color="default" size="sm" onPress={() => cancelEditing(log.id)} className={`${buttonClass} hover:border-gray-500`}>
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button color="primary" size="sm" onPress={() => startEditing(log.id)} className={`${buttonClass} hover:border-blue-500`}>
                              Update
                            </Button>
                            <Button color="danger" size="sm" onPress={() => confirmDelete(log.id)} disabled={isDeleting(log.id)} className={`${buttonClass} hover:border-red-500`}>
                              {isDeleting(log.id) ? <LoadingStates.DeleteLoading /> : 'Delete'}
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {currentLogs.map((log, index) => (
            <MobileLogCard
              key={log.id}
              log={log}
              index={index}
              isEditing={isEditing(log.id)}
              isSaving={isSaving(log.id)}
              isDeleting={isDeleting(log.id)}
              onUpdateField={updateLogField}
              onSave={saveLog}
              onCancel={cancelEditing}
              onStartEditing={startEditing}
              onDelete={confirmDelete}
              formatDate={formatDate}
            />
          ))}
        </div>

        {/* Pagination */}
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          itemsPerPage={itemsPerPage}
          totalItems={logs.length}
        />

        {logs.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            No logs available. Click "Add New Log" to create your first log entry.
          </div>
        )}
      </div>
    </>
  );
};
